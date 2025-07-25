import { Album } from 'src/albums/albums.interface';
import { Artist } from 'src/artists/artists.interface';
import { Track } from 'src/tracks/tracks.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
