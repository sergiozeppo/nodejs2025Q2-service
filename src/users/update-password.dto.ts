import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '123Password',
    description: 'Current password',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'NewPassword123',
    description: 'New password.',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
