import { Controller, Get, Param, NotFoundException, Post, Body, Delete, Put, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import type { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users') // Ruta base: /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // El decorador @Get() sin parámetros hace que este método responda a la ruta /users
  // Si quieres que responda a /users/getAllUsers, usa @Get('getAllUsers')
  @Get()
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }
  // Ejemplo http://localhost:4000/users/1
  @Get(':id')
  findUser(@Param('id') id: string): User {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Post()
  createUser(@Body() body: CreateUserDto): User {
    // El id se genera automáticamente
    return this.usersService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): { message: string } {
    const deleted = this.usersService.delete(id);
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted successfully' };
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto): User {
    const user = this.usersService.update(id, body);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (body.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) {
      throw new UnprocessableEntityException('Email inválido');
    }
    Object.assign(user, body);
    return user;
  }
}
