import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Favorites } from './favorites.interface';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
  ) {}

  getAllFavs() {
    return {
      artists: this.favorites.artists.map((id) =>
        this.artistsService.getById(id),
      ),
      albums: this.favorites.albums.map((id) => this.albumsService.getById(id)),
      tracks: this.favorites.tracks.map((id) => this.tracksService.getById(id)),
    };
  }

  addAlbumToFavs(albumId: string) {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid Album ID');
    }

    this.isAlbumExists(albumId);
    this.favorites.albums.push(albumId);
  }

  deleteAlbumFromFavs(albumId: string) {
    const remIndex = this.favorites.albums.indexOf(albumId);
    if (remIndex === -1)
      throw new NotFoundException('Album is not in favorites');
    this.favorites.albums.splice(remIndex, 1);
  }

  addArtistToFavs(artistId: string) {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid Artist ID');
    }

    this.isArtistExists(artistId);
    this.favorites.artists.push(artistId);
  }

  deleteArtistFromFavs(artistId: string) {
    const remIndex = this.favorites.artists.indexOf(artistId);
    if (remIndex === -1)
      throw new NotFoundException('Artist is not in favorites');
    this.favorites.artists.splice(remIndex, 1);
  }

  addTrackToFavs(trackId: string) {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid Track ID');
    }

    this.isTrackExists(trackId);
    this.favorites.tracks.push(trackId);
  }

  deleteTrackFromFavs(trackId: string) {
    const remIndex = this.favorites.tracks.indexOf(trackId);
    if (remIndex === -1)
      throw new NotFoundException('Track is not in favorites');
    this.favorites.tracks.splice(remIndex, 1);
  }

  deleteAlbum(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
  }

  deleteArtist(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
  }

  deleteTrack(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }

  private isAlbumExists(albumId: string) {
    try {
      this.albumsService.getById(albumId);
    } catch {
      throw new UnprocessableEntityException('Album does not exist');
    }
  }

  private isArtistExists(artistId: string) {
    try {
      this.artistsService.getById(artistId);
    } catch {
      throw new UnprocessableEntityException('Artist does not exist');
    }
  }

  private isTrackExists(trackId: string) {
    try {
      this.tracksService.getById(trackId);
    } catch {
      throw new UnprocessableEntityException('Track does not exist');
    }
  }
}
