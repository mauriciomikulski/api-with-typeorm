import { DbEnum } from "../../configs/enums/db.enum";
import { Users } from "../../entity/Users";
import { FactoryGetConn } from "../../factory/FactoryGetConn";
import { MailTrapService } from "../../services/MailTrap/MailTrap.service";
import { appDataSource } from "../../data-source";


export class CreateUserService {
  static mailtrap: MailTrapService;
  public static async execute(user: Users): Promise<Users | Error> {
    const userRepository = appDataSource.getRepository(Users);
    if (await userRepository.findOne({ where: { user_email: user.user_email, user_login: user.user_login } })) return new Error("Email já cadastrado");
    await userRepository.save(user);
    await this.mailtrap.sendMail({
      to: {
        name: user.user_nome,
        email: user.user_email
      },
      from: {
        name: "Equipe Jintay",
        email: "jintaybr@gmail.com"
      },
      subject: "Seja Bem-Vindo ao meu site",
      body: "<p>Sua conta foi criada com sucesso.</p>"
    });
  }
}