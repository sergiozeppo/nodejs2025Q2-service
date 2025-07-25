import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: '3f9c1b52-8d6e-4d99-9a3b-9e7cb9181f2a',
    description: 'Unique identifier for the user.',
  })
  id: string;

  @ApiProperty({
    example: 'your_name',
    description: 'Login of the user',
  })
  login: string;

  @ApiProperty({
    example: 1,
    description: 'Version of the user record. Incremented on each update.',
  })
  version: number;

  @ApiProperty({
    example: 1816161651,
    description: 'Timestamp of when the user was created.',
  })
  createdAt: number;

  @ApiProperty({
    example: 1816161652,
    description: 'Timestamp of when the user was last updated.',
  })
  updatedAt: number;
}
