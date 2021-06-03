import { createUserLoader } from './utils/createUserLoader';
import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { Stream } from 'stream';

export interface appContext {
  req: Request & {
    // @ts-ignore
    session: Express.Session;
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
}

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
