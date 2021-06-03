import { validatePassword, validateRegister } from "../validation/user";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { Cart } from "../entities/Cart";
import { getCart } from "../utils/getCart";
import argon from "argon2";
import gravatar from "gravatar";
import { User } from "../entities/User";
import { CORS_ORIGIN, RESET_PASSWORD_PREFIX } from "../_constants";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { appContext } from "../context";
import { UserType, UserRegisterInputType } from "../types/user";
import sendMail from "../utils/sendMail";
import { isAdmin } from "../middleware/auth";

@Resolver()
export class UserResolver {
  @Query(() => UserType, { nullable: true })
  async user(@Ctx() { req }: appContext): Promise<UserType | null> {
    if (!req.session.userId) return null;
    const user = await User.findOne(req.session.userId, {
      relations: ["cart"],
    });
    const cart = await getCart(user!.cart.id);
    return { user, cart };
  }

  @Query(() => [User])
  @UseMiddleware(isAdmin)
  async users(): Promise<User[]> {
    const users = await getConnection()
      .getRepository(User)
      .createQueryBuilder()
      .getMany();
    return users;
  }

  @Mutation(() => UserType)
  async register(
    @Arg("opts") opts: UserRegisterInputType,
    @Ctx() { req }: appContext
  ): Promise<UserType> {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      password2,
      seller,
      admin,
    } = opts;
    const { error } = validateRegister(opts);
    const errorField = error?.details[0].message
      .split(" ")[0]
      .split("")
      .slice(1, -1)
      .join("");
    const ex = validatePassword(password);
    if (error)
      return { errors: [{ msg: error.details[0].message, field: errorField }] };
    if (ex.error)
      return {
        errors: [{ msg: ex.error.details[0].message, field: "password" }],
      };
    let user = await User.findOne({ where: { username } });
    if (user)
      return {
        errors: [
          {
            field: "username",
            msg: `Username  ${username} is taken.`,
          },
        ],
      };

    if (password !== password2)
      return {
        errors: [
          {
            field: "password2",
            msg: `Passwords don't match. try again.`,
          },
        ],
      };

    user = await User.findOne({ where: { email } });

    if (user)
      return {
        errors: [
          {
            field: "email",
            msg: `Email address  ${email} is taken.`,
          },
        ],
      };
    const hash = await argon.hash(password);
    const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
    user = await User.create({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username: username,
      email,
      avatar,
      password: hash,
      seller,
      admin,
    }).save();
    await Cart.create({ user }).save();
    req.session!.userId = user.id;
    return { user, cart: [] };
  }

  @Mutation(() => UserType)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: appContext
  ): Promise<UserType> {
    const user = await User.findOne(
      usernameOrEmail.includes("@" && ".")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user)
      return {
        errors: [
          { field: "usernameOrEmail", msg: "Invalid username or email." },
        ],
      };

    const ps = await argon.verify(user.password, password);
    if (!ps)
      return { errors: [{ field: "password", msg: `Invalid password.` }] };

    req.session.userId = user.id;
    const userCart = await getConnection().manager.findOne(Cart, {
      where: { userId: user.id },
    });
    const cart = await getCart(userCart!.id);
    return { user, cart };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: appContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie("sid");
        return err ? resolve(false) : resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: appContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    const token = v4();
    await redis.set(
      RESET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 72
    );
    await sendMail(
      CORS_ORIGIN,
      email,
      "Password Reset",
      `<a href="${CORS_ORIGIN}/forgot-password/${token}"></a>`
    );
    return true;
  }

  @Mutation(() => Boolean)
  async changePassword(
    @Arg("newPassword") newPassword: string,
    @Arg("token") token: string,
    @Ctx() { redis, req }: appContext
  ): Promise<boolean> {
    const key = RESET_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) return false;
    const user = await User.findOne(parseInt(userId));
    if (!user) return false;
    user.password = await argon.hash(newPassword);
    await user.save();
    req.session.userId = user.id;
    return true;
  }
}
