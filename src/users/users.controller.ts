import {
  Controller,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-password.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: UserResponseDto,
  })
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unique user by ID' })
  @ApiParam({ name: 'id', description: 'User ID in UUID format' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid User ID' })
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUser: CreateUserDto) {
    return this.usersService.create(createUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Invalid User ID' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.usersService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Incorrect old password',
  })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePass: UpdatePasswordDto,
  ) {
    return this.usersService.update(id, updatePass);
  }
}
