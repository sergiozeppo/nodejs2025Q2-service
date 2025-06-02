import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty({
    example: '3f9c1b52-8d6e-4d99-9a3b-9e7cb9181f2a',
    description: 'Unique identifier for the artist.',
  })
  id: string;

  @ApiProperty({
    example: 'Nirvana',
    description: 'Name of the artist',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if the artist has won a Grammy award',
  })
  grammy: boolean;
}
