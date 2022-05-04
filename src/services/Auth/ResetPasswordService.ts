import bcryptjs from 'bcryptjs';
import { log } from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { Users } from '../../entity/Users';
import { MailTrapService } from "../../services/MailTrap/MailTrap.service";
import { appDataSource } from '../DataBase/data-source';

export class ResetPasswordService {
  static async execute(user: Users): Promise<Users> {
    const NAMESPACE = 'ResetPasswordService';
    const userRepository = appDataSource.getRepository(Users);
    const userFound = await userRepository.findOneBy({ id: user.id });
    log(NAMESPACE, `Reseting password for user: ${userFound.user_login}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    if (userFound) {
      const passwordHash = await bcryptjs.hash(user.user_password, 10);
      userFound.user_password = passwordHash;
      await userRepository.update(user.id, userFound);
      await MailTrapService.sendMail({
        to: {
          user_name: userFound.user_name,
          user_email: userFound.user_email
        },
        from: {
          user_name: "Equipe Jintay",
          user_email: "jintaybr@gmail.com"
        },
        subject: "Sua senha foi alterada",
        body: `<p>Sua nova senha é ${user.user_password}.</p>`
      });
      return userFound;
    } else {
      log(NAMESPACE, `User with id: ${user.id} not found`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      throw new Error('Invalid password');
    }
  }
}