import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'your_name',
    description:
      'Login for the user. Must be unique and at least 1 character long.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Login is mandatory' })
  login: string;

  @ApiProperty({
    example: 'your_password',
    description: 'Password for the user. Must be at least 8 characters long.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must have at least 8 characters' })
  password: string;
}
