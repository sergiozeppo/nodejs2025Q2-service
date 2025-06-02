import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
