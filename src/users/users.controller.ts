import { Controller, Get, Param, NotFoundException, Post, Body } from '@nestjs/common';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users') // Ruta base: /users
export class UsersController {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' },
  ];

  // El decorador @Get() sin parámetros hace que este método responda a la ruta /users
  // Si quieres que responda a /users/getAllUsers, usa @Get('getAllUsers')
  @Get()
  getAllUsers(): User[] {
    return this.users;
  }
  // Ejemplo http://localhost:4000/users/1
  @Get(':id')
  findUser(@Param('id') id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  @Post()
  createUser(@Body() body: User): User {
    this.users.push(body);
    return body;
  }
}
