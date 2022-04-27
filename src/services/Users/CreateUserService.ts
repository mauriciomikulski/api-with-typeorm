import { Users } from "../../entity/Users";
import { MailTrapService } from "../../services/MailTrap/MailTrap.service";
import { appDataSource } from "../DataBase/data-source";

type CreateUserRequest = {
  user_nome: string;
  user_email: string;
  user_login: string;
  user_password: string;
  user_tipo?: number;
};

export class CreateUserService { 
  static mailtrap: MailTrapService;
  static async execute(user: CreateUserRequest): Promise<Users | Error> {
    const userRepository = appDataSource.getRepository(Users);
    if (await userRepository.findOneBy({ user_email: user.user_email, user_login: user.user_login })) {
      return new Error("Email já cadastrado")
    }
    await userRepository.save(user);
    await this.mailtrap.sendMail({
      to: {
        user_name: user.user_nome,
        user_email: user.user_email
      },
      from: {
        user_name: "Equipe Jintay",
        user_email: "jintaybr@gmail.com"
      },
      subject: "Seja Bem-Vindo ao meu site",
      body: "<p>Sua conta foi criada com sucesso.</p>"
    });
  }
}