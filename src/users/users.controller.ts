import { Controller, Get, Param, NotFoundException, Post, Body, Delete, Put } from '@nestjs/common';

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
    // el id se debe pasar internamiente o generarse automáticamente
    const newUser = {
      ...body,
      id: `${this.users.length + 1}`,
    };
    this.users.push(newUser);
    return newUser;
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string): { message: string } {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    this.users = this.users.filter((user) => user.id !== id);
    return { message: 'User deleted successfully' };
  }
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: Partial<User>): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, body);
    return user;
  }
}
