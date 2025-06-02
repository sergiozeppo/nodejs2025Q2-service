import {
  Injectable,
  BadRequestException,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { Artist } from './artists.interface';
import { CreateArtistDto } from './create-artist.dto';
import { AlbumsService } from 'src/albums/albums.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  getAll(): Artist[] {
    return this.artists;
  }

  getById(id: string): Artist {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Artist ID');
    }

    const artist = this.artists.find((x) => x.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  create(createArtistDto: CreateArtistDto): Artist {
    const newbie: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artists.push(newbie);
    return newbie;
  }

  update(id: string, updateArtist: CreateArtistDto): Artist {
    const upArtist = this.getById(id);
    Object.assign(upArtist, updateArtist);
    return upArtist;
  }

  delete(id: string): void {
    const deleteID = this.artists.findIndex((x) => x.id === id);
    if (deleteID === -1) throw new NotFoundException('Artist not found');

    this.artists.splice(deleteID, 1);
  }
}
