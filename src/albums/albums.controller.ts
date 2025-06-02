import {
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './create-album.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of albums' })
  @ApiResponse({ status: 200, description: 'List of albums' })
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unique album by ID' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 200, description: 'Album found' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Invalid Album ID' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({ status: 201, description: 'Album created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbum: CreateAlbumDto) {
    return this.albumsService.create(createAlbum);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 204, description: 'Album deleted successfully' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Invalid Album ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.albumsService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({ name: 'id', description: 'Album UUID' })
  @ApiResponse({ status: 200, description: 'Album updated successfully' })
  @ApiResponse({ status: 404, description: 'Album not found' })
  @ApiResponse({ status: 400, description: 'Invalid Album ID' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbum: CreateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbum);
  }

  deleteArtistFromAlbums(artistId: string) {
    this.albumsService.deleteArtistFromAlbums(artistId);
  }
}
