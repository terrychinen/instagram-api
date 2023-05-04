import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int, { description: `User's id` })
  userId: number;

  @Column()
  @Field(() => String, { description: 'First name' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'Last name' })
  lastName: string;

  @Column()
  @Field(() => String, { description: `User's email` })
  email: string;

  @Column()
  @Field(() => String, { description: `User's password` })
  password: string;

  @Column()
  @Field(() => Date, { description: 'Birth date' })
  birthDate: Date;

  @Column()
  @Field(() => String, { description: 'Country name' })
  country: string;

  @Column()
  @Field(() => String, { description: 'Number phone' })
  phone: string;

  @Column()
  @Field(() => String, { description: 'The url image profile' })
  imageProfile: string;

  @Column()
  @Field(() => Int, { description: `User's followers` })
  followers: number;

  @Column()
  @Field(() => Int, { description: `User's followings` })
  following: number;

  @Column()
  @Field(() => Int, { description: 'Total user posts' })
  postsTotal: number;

  @Column()
  @Field(() => String, { description: `User's token` })
  token: string;

  @Column()
  @Field(() => Boolean, {
    description: `If the user's profile is private (true or false)`,
  })
  isPrivate: boolean;

  @Column()
  @Field(() => Boolean, {
    description: 'If the user is active (true or false)',
  })
  isActive: boolean;
}
