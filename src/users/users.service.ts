import { Injectable } from '@nestjs/common';
import { User } from './user.model';

//se usa la lógica de negocio aquí
@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }
  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      ...user,
      id: `${this.users.length + 1}`,
    };
    this.users.push(newUser);
    return newUser;
  }
  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
  update(id: string, updates: Partial<Omit<User, 'id'>>): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return undefined;
    }
    Object.assign(user, updates);
    return user;
  }
}
