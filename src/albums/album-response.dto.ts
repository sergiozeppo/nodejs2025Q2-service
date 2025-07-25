import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponseDto {
  @ApiProperty({
    example: '3f9c1b52-8d6e-4d99-9a3b-9e7cb9181f2a',
    description: 'Unique identifier for the album.',
  })
  id: string;

  @ApiProperty({
    example: 'Nevermind',
    description: 'Name of the album',
  })
  name: string;

  @ApiProperty({
    example: 1991,
    description: 'Year the album was released',
  })
  year: number;

  @ApiProperty({
    example: 'a12f7c88-5b73-4c1a-a1c6-3bde9b95cf6e',
    description: 'Unique identifier for the artist associated with the album.',
  })
  artistId: string;
}
