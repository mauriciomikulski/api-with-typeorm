import { User } from '../entities/user.entities';

export interface IUser {
  findByLogin(login: string): Promise<User>;
  saveUser(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  updateUser(id: User): Promise<User>;
  deleteUser(id: User): Promise<void>;
}