import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => Int, { description: `User's id` })
  userId: string;

  @Column()
  @Field(() => String, { description: 'First name' })
  firstName: string;

  @Column()
  @Field(() => String, { description: 'Last name' })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
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

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: `User's followers` })
  followers: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: `User's followings` })
  following: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int, { description: 'Total user posts' })
  postsTotal: number;

  @Column({ nullable: true })
  @Field(() => String, { description: `User's token` })
  token: string;

  @Column()
  @Field(() => Date, { description: `User's register date` })
  registerDate: Date;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean, {
    description: `If the user's profile is private (true or false)`,
  })
  isPrivate: boolean;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean, {
    description: 'If the user is active (true or false)',
  })
  isActive: boolean;
}
