import { Controller, Get, Param } from '@nestjs/common';

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

  @Get(':id')
  findUser(@Param('id') id: string): {
      return this.users.find((user) => user.id === id);
    }
  }
  findUser(@Param('id') id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
