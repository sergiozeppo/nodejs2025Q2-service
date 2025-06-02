import { ApiProperty } from '@nestjs/swagger';

export class TrackResponseDto {
  @ApiProperty({
    example: '3f9c1b52-8d6e-4d99-9a3b-9e7cb9181f2a',
    description: 'Unique identifier for the track.',
  })
  id: string;

  @ApiProperty({
    example: 'Smells Like Teen Spirit',
    description: 'Name of the track',
  })
  name: string;

  @ApiProperty({
    example: '3f9c1b52-8d6e-4d99-9a3b-9e7cb9181f2a',
    description: 'UUID of the artist associated with the track',
  })
  artistId: string;

  @ApiProperty({
    example: '3f9c1b52-8d6e-4d99-9a3b-9e7cb9181f2a',
    description: 'UUID of the album associated with the track',
  })
  albumId: string;
  @ApiProperty({
    example: 354,
    description: 'Duration of the track in seconds',
  })
  duration: number;
}
