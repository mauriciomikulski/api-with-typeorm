import { Users } from "../../entity/Users";
import { hash } from "bcryptjs"
import { log } from "../../utils/LogHelper";
import { LOG_CONSTANTS } from "../../configs/constants/LogConstants";
import { MailTrapService } from "../../services/MailTrap/MailTrap.service";
import { appDataSource } from "../DataBase/data-source";

type CreateUserRequest = {
  user_name: string;
  user_email: string;
  user_login: string;
  user_password: string;
  user_tipo?: number;
};

export class CreateUserService {
  static async execute(user: CreateUserRequest): Promise<Users | Error> {
    try {
      const NAMESPACE = "CreateUserService";
      log(NAMESPACE, `Creating user: ${user.user_login}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
      const userRepository = appDataSource.getRepository(Users);
      if (await userRepository.findOne({where: { user_email: user.user_email, user_login: user.user_login }})) {
        return new Error("User aready exists");
      }
      const hashedPassword = await hash(user.user_password, 10);
      const newUser = userRepository.create({
        ...user,
        user_password: hashedPassword
      });
      await userRepository.save(newUser);
      await MailTrapService.sendMail({
        to: {
          user_name: user.user_name,
          user_email: user.user_email
        },
        from: {
          user_name: "Equipe Jintay",
          user_email: "jintaybr@gmail.com"
        },
        subject: "Seja Bem-Vindo ao meu site",
        body: "<p>Sua conta foi criada com sucesso.</p>"
      });
    } catch (error) {
      log("CreateUserService", `Error creating user: ${error}`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      return new Error(error);
    }
  }
}