import { User } from "../../entities/user.entities";
import { IUser } from "../../interfaces/IUser.interface";
import { IMailTrap } from "../../providers/IMailTrap.provider";
import { CreateUserDTO } from "./createUserDTO";

export class CreateUser {
  constructor(
    private usersRepository: IUser,
    private mailProvider: IMailTrap
  ) { }

  async execute(data: CreateUserDTO) {
    const userAreadyExists = await this.usersRepository.findByLogin(data.login);

    if (userAreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.saveUser(user);

    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe do meu app',
        email: 'jintaybr@gmail.com',
      },
      subject: 'Seja bem vindo ao sistema',
      body: '<p>Você já pode fazer login em nossa plataforma</p>'
    });
  }
}