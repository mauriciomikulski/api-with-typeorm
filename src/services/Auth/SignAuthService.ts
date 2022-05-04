import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { log } from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { Users } from '../../entity/Users';
import { appDataSource } from '../DataBase/data-source';

export class SignAuthService {

  static async sign(user: Users, callback: (error: Error | null, token: string | null, userMatch: Users) => void): Promise<void> {
    const NAMESPACE = 'SignAuthService';
    log(NAMESPACE, `Signing user: ${user.user_login}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    const userRepository = appDataSource.getRepository(Users);
    const userFound = await userRepository.findOneBy({ user_login: user.user_login });
    await bcryptjs.compare(user.user_password, userFound.user_password).then(async (result) => {
      if (result) {
        const token = jwt.sign({
          id: userFound.id,
          userName: userFound.user_login,
          name: userFound.user_name,
          tipo: userFound.user_tipo
        }, process.env.JWT_SECRET, {
          subject: userFound.id,
          issuer: process.env.JWT_ISSUER,
          algorithm: 'HS256',
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const { id, user_name, user_email, user_login, user_tipo } = userFound;
        const userMatch = { id, user_name, user_email, user_login, user_tipo };
        callback(null, token, userMatch);
      } else {
        log(NAMESPACE, `User with login: ${user.user_login} not found`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
        callback(new Error('Invalid password'), null, null);
      }
    });
  }
}