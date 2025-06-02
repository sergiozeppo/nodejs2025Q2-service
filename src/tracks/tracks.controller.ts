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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './create-track.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tracks' })
  @ApiResponse({ status: 200, description: 'List of tracks' })
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 200, description: 'Track found' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Invalid Track ID' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({ status: 201, description: 'Track created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 204, description: 'Track deleted successfully' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Invalid Track ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.tracksService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({ name: 'id', description: 'Track UUID' })
  @ApiResponse({ status: 200, description: 'Track updated successfully' })
  @ApiResponse({ status: 404, description: 'Track not found' })
  @ApiResponse({ status: 400, description: 'Invalid Track ID' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: CreateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }
}
