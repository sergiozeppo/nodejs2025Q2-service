import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Get,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { FavoritesResponseDto } from './favorites-response.dto';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'List of all favorites',
    type: FavoritesResponseDto,
  })
  getAll() {
    return this.favoritesService.getAllFavs();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 201,
    description: 'Artist added to favorites successfully',
    type: FavoritesResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID or artist already in favorites',
  })
  @HttpCode(HttpStatus.CREATED)
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({
    status: 204,
    description: 'Artist deleted from favorites successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found in favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteArtistFromFavs(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({
    status: 201,
    description: 'Album added to favorites successfully',
    type: FavoritesResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID or album already in favorites',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found',
  })
  @HttpCode(HttpStatus.CREATED)
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({
    status: 204,
    description: 'Album deleted from favorites successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found in favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteAlbumFromFavs(id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 204,
    description: 'Track deleted from favorites successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found in favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteTrackFromFavs(id);
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({
    status: 201,
    description: 'Track added to favorites successfully',
    type: FavoritesResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID or track already in favorites',
  })
  @HttpCode(HttpStatus.CREATED)
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrackToFavs(id);
  }
}
