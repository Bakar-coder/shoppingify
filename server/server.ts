import "reflect-metadata";
import "dotenv-safe/config";
import express, { NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { dbConfig } from "./db-config";
import { resolve } from "path";
import { mkdir, readdir } from "fs";
import session from "express-session";
import connectRedis from "connect-redis";
import helmet from "helmet";
import Redis from "ioredis";
import { CORS_ORIGIN, PRIVATE_KEY, REDIS_URL, __prod__ } from "./_constants";
import { createConnection } from "typeorm";
import { logger } from "./utils/logger";
import { BraintreeResolver } from "./resolvers/braintree";
import compression from "compression";
import { appContext } from "./context";
import { User } from "./entities/User";
import { userLoader } from "./utils/userLoader";
import { AdminProductResolver } from "./resolvers/admin/products";
import { CartResolver } from "./resolvers/shop/cart";
import { ProductResolver } from "./resolvers/shop/product";
import { UserResolver } from "./resolvers/user";
import { filePaths } from "./utils/paths";

const port = process.env.PORT || 8080;
const app = express();
const redis = new Redis(REDIS_URL);
const redisStore = connectRedis(session);

filePaths.map((filePath) =>
  readdir(
    filePath,
    (_, path) =>
      path === undefined &&
      mkdir(`${filePath}`, { recursive: true }, (err) => {
        if (err) logger.error(err.message, err);
      })
  )
);

const server = async () => {
  const conn = await createConnection({
    ...dbConfig,
    entities: ["build/entities/*.js"],
    migrations: ["build/migrations/*.js"],
  });

  app
    .disable("x-powered-by")
    .set("trust proxy", 1)
    .use(express.urlencoded({ extended: false }))
    .use("/media", express.static(resolve("media")))
    .use(cors({ credentials: true, origin: CORS_ORIGIN }))
    .use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }))
    .use(
      session({
        name: "sid",
        secret: PRIVATE_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          sameSite: "lax",
          httpOnly: __prod__,
          maxAge: 1000 * 60 * 60 * 24 * 7,
          secure: __prod__,
        },
        store: new redisStore({ client: redis, disableTouch: true }),
      })
    )
    .use(async (req: appContext["req"], _: any, next: NextFunction) => {
      if (!req.session.userId) return next();
      const user = await User.findOne(req.session.userId, {
        relations: ["cart"],
      });
      req.user = user;
      return next();
    })
    .use((req, res, next) => {
      if (req.user) {
        res.locals.user = req.user;
        res.locals.isAuth = true;
        res.locals.userLoader = userLoader();
      }
      next();
    })
    .use(helmet())
    .use(compression());

  const apollo = new ApolloServer({
    uploads: false,
    schema: await buildSchema({
      validate: false,
      resolvers: [
        UserResolver,
        CartResolver,
        ProductResolver,
        AdminProductResolver,
        BraintreeResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apollo.applyMiddleware({ app, cors: false });
  conn && logger.info("🚀 connected to postgresql database.");
  conn && (await conn.runMigrations());
  conn &&
    app.listen(port, () => logger.info(`🚀 server running on port :${port}`));
};
process.on("uncaughtException", (ex) => logger.error(ex.message, ex));
process.on("unhandledRejection", (ex) => logger.error(ex));
server().catch((ex) => logger.error(ex.message, ex));
