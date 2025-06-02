import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Login is mandatory' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  password: string;
}
