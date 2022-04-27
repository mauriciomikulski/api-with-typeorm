import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { log } from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { Users } from '../../entity/Users';
import { appDataSource } from '../DataBase/data-source';

export class SignAuthService {

  static async sign(user: Users, callback: (error: Error | null, token: string | null) => void): Promise<void> {
    const NAMESPACE = 'SignAuthService';
    log(NAMESPACE, `Signing user: ${user.user_login}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    const userRepository = appDataSource.getRepository(Users);
    const userFound = await userRepository.findOneBy({ user_login: user.user_login, user_password: user.user_password });
    await compare(user.user_password, userFound.user_password);
    const token = jwt.sign({
      id: userFound.id,
      email: userFound.user_email
    }, process.env.JWT_SECRET, {
      subject: userFound.id,
      issuer: process.env.JWT_ISSUER,
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
      (error, token) => {
        if (error) {
          log(NAMESPACE, `Error: ${error}`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
          callback(error, null);
        } else {
          log(NAMESPACE, `Token: ${token}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
          callback(null, token);
        }
      });
    log(
      'SignAuthService',
      `User: ${userFound.user_login} signed in successfully`,
      LOG_CONSTANTS.LOG_LEVEL.INFO
    );
    return token;
  }
}