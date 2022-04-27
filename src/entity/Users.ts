import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  user_name: string;
  @Column()
  user_email: string;
  @Column()
  user_login: string;
  @Column()
  user_password: string;
  @Column({default: 1})
  user_tipo?: number;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}