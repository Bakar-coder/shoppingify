import { GraphQLUpload } from 'graphql-upload';
import { Field, InputType, ObjectType } from 'type-graphql';
import { ErrorField } from './error';
import { Post } from '../entities/Post';
import { FileUpload } from '../context';

@InputType()
export class postInputType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => GraphQLUpload)
  image: FileUpload;
}

@ObjectType()
export class PostResponse {
  @Field(() => [ErrorField], { nullable: true })
  errors?: ErrorField[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}
