import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../albums/albums.entity';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/tracks.entity';
import { Favorites } from '../favorites/favorites.entity';
import { User } from '../users/users.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track, Favorites, User])],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
