import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponseDto } from 'src/albums/album-response.dto';
import { ArtistResponseDto } from 'src/artists/artist-response.dto';
import { TrackResponseDto } from 'src/tracks/tracks-response.dto';

export class FavoritesResponseDto {
  @ApiProperty({
    example: [],
    description: 'List of favorite artists',
  })
  artists: ArtistResponseDto[];

  @ApiProperty({
    example: [],
    description: 'List of favorite albums',
  })
  albums: AlbumResponseDto[];

  @ApiProperty({
    example: [],
    description: 'List of favorite tracks',
  })
  tracks: TrackResponseDto[];
}
