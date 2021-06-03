import { ObjectType, Field } from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@ObjectType()
@Entity()
export class ReviewItem extends BaseEntity {
  @Field()
  @PrimaryColumn()
  reviewId: number

  @Field()
  @PrimaryColumn()
  productId: number

  @Field()
  @Column({ type: "text" })
  description: string

  @Field()
  @Column({ type: "numeric" })
  rating: number
}