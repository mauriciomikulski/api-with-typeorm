import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users', synchronize: false })
export class Users {
  @PrimaryColumn()
  public readonly id?: string;
  
  public user_nome: string;
  
  public user_email: string;
  
  public user_login: string;
  
  public user_password: string;
  
  public user_tipo?: number;

  constructor(props: Omit<Users, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuidv4();
    }
  }
}