import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { Album } from './albums.interface';
import { CreateAlbumDto } from './create-album.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  getAll(): Album[] {
    return this.albums;
  }

  getById(id: string): Album {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Album ID');
    }

    const album = this.albums.find((x) => x.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  create(createAlbum: CreateAlbumDto): Album {
    const newbie: Album = {
      id: uuidv4(),
      ...createAlbum,
    };
    this.albums.push(newbie);
    return newbie;
  }

  delete(id: string): void {
    const index = this.albums.findIndex((x) => x.id === id);
    if (index === -1) throw new NotFoundException('Album not found');
    this.tracksService.deleteAlbumFromTracks(id);
    this.favoritesService.deleteAlbum(id);
    this.albums.splice(index, 1);
  }

  update(id: string, updateAlbum: CreateAlbumDto): Album {
    const album = this.getById(id);
    Object.assign(album, updateAlbum);
    return album;
  }

  deleteArtistFromAlbums(artistId: string) {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
