import { log } from "../../utils/LogHelper";
import { LOG_CONSTANTS } from "../../configs/constants/LogConstants";
import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";
import { MailTrapService } from "../MailTrap/MailTrap.service";

export class ForgotPasswordService {
  static async execute(user: Users): Promise<Users | Error> {
    const NAMESPACE = "ForgotPasswordService";
    const userRepository = appDataSource.getRepository(Users);
    const userFound = await userRepository.findOneBy({ user_email: user.user_email });
    log(NAMESPACE, `Forgot password for user: ${userFound.user_login}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    if (userFound) {
      await MailTrapService.sendMail({
        to: {
          user_name: user.user_name,
          user_email: user.user_email
        },
        from: {
          user_name: "Equipe Jintay",
          user_email: "jintaybr@gmail.com"
        },
        subject: "Recuperação de senha",
        body: "<p>Você solicitou reset da sua senha</p></br><p><a href='#'>Clique no aqui para escolher sua nova senha</a></p>"
        });
      return userFound;
    } else {
      log(NAMESPACE, `User not found: ${user.user_login}`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      return new Error("Invalid password");
    }
  }
}