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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './create-artist.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of artists' })
  @ApiResponse({ status: 200, description: 'List of artists' })
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unique artist by ID' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 200, description: 'Artist found' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Invalid Artist ID' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({ status: 201, description: 'Artist created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtist: CreateArtistDto) {
    return this.artistsService.create(createArtist);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 204, description: 'Artist deleted successfully' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Invalid Artist ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.artistsService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({ name: 'id', description: 'Artist UUID' })
  @ApiResponse({ status: 200, description: 'Artist updated successfully' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  @ApiResponse({ status: 400, description: 'Invalid Artist ID' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtist: CreateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtist);
  }
}
