import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEmail()
  @MinLength(5)
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsDate()
  birthDate: Date;

  @IsString()
  @MinLength(1)
  country: string;

  @IsString()
  @MinLength(5)
  phone: string;

  @IsString()
  imageProfile: string;
}
