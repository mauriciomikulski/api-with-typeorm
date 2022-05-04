import { log } from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { hash } from 'bcryptjs';
import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";


type userToUpdate = {
  id: string,
  user_name?: string,
  user_email?: string,
  user_password?: string,
  user_login?: string,
  user_tipo?: number;
}

export class UpdateUserService {
  static async execute(user: userToUpdate): Promise<Users | Error> {
    const NAMESPACE = "UpdateUserService";
    log(NAMESPACE, `Updating user with id: ${user.id}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    const userRepository = await appDataSource.getRepository<Users>(Users);
    const userToUpdate = await userRepository.findOneBy({ id: user.id });
    if (userToUpdate) {      
      if (user.user_password) {
        const passwordHash = await hash(user.user_password, 10);
        userToUpdate.user_name = user.user_name ? user.user_name : userToUpdate.user_name;
        userToUpdate.user_email = user.user_email ? user.user_email : userToUpdate.user_email;
        userToUpdate.user_password = passwordHash ? passwordHash : userToUpdate.user_password;
        userToUpdate.user_login = user.user_login ? user.user_login : userToUpdate.user_login;
        userToUpdate.user_tipo = user.user_tipo ? user.user_tipo : userToUpdate.user_tipo;
        await userRepository.update(user.id, userToUpdate);
        return userToUpdate;
      } else {
        userToUpdate.user_name = user.user_name ? user.user_name : userToUpdate.user_name;
        userToUpdate.user_email = user.user_email ? user.user_email : userToUpdate.user_email;
        userToUpdate.user_password = user.user_password ? user.user_password : userToUpdate.user_password;
        userToUpdate.user_login = user.user_login ? user.user_login : userToUpdate.user_login;
        userToUpdate.user_tipo = user.user_tipo ? user.user_tipo : userToUpdate.user_tipo;
        await userRepository.update(user.id, userToUpdate);
        return userToUpdate;
      }
    } else {
      log(NAMESPACE, `User with id: ${user.id} not found`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      return new Error('User not found');
    }    
  }
}