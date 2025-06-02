import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './users.interface';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll(): Omit<User, 'password'>[] {
    return this.users.map((user) => {
      const userWithoutPass = { ...user };
      delete userWithoutPass.password;
      return userWithoutPass;
    });
  }

  getById(id: string): Omit<User, 'password'> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid User ID');
    }

    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    const { ...userWithoutPass } = user;
    delete userWithoutPass.password;
    return userWithoutPass;
  }

  create(createUser: CreateUserDto): Omit<User, 'password'> {
    if (!createUser.login || !createUser.password) {
      throw new BadRequestException(
        'Login and password are required to create a user',
      );
    }

    const newbie: User = {
      id: uuidv4(),
      login: createUser.login,
      password: createUser.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newbie);
    const userWithoutPass = { ...newbie };
    delete userWithoutPass.password;
    return userWithoutPass;
  }

  update(id: string, updatePass: UpdatePasswordDto): Omit<User, 'password'> {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    if (user.password !== updatePass.oldPassword) {
      throw new ForbiddenException('Previous password is incorrect');
    }

    user.password = updatePass.newPassword;
    user.updatedAt = Date.now();
    user.version++;

    const userWithoutPass = { ...user };
    delete userWithoutPass.password;
    return userWithoutPass;
  }

  delete(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    this.users.splice(index, 1);
  }
}
