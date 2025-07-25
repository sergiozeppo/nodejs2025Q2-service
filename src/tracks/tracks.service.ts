import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { Track } from './tracks.interface';
import { CreateTrackDto } from './create-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  getAll(): Track[] {
    return this.tracks;
  }

  getById(id: string): Track {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Track ID');
    }

    const track = this.tracks.find((x) => x.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  create(createTrack: CreateTrackDto): Track {
    const newbie: Track = {
      id: uuidv4(),
      ...createTrack,
    };
    this.tracks.push(newbie);
    return newbie;
  }

  delete(id: string): void {
    const index = this.tracks.findIndex((x) => x.id === id);
    if (index === -1) throw new NotFoundException('Track not found');
    this.favoritesService.deleteTrack(id);
    this.tracks.splice(index, 1);
  }

  update(id: string, updateTrack: CreateTrackDto): Track {
    const upTrack = this.getById(id);
    Object.assign(upTrack, updateTrack);
    return upTrack;
  }

  deleteAlbumFromTracks(albumId: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    });
  }

  deleteArtistFromTracks(artistId: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    });
  }
}
