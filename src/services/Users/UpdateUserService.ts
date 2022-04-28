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
    const userRepository = await appDataSource.getRepository<Users>(Users);
    const userToUpdate = await userRepository.findOneBy({ id: user.id });
    if (!userToUpdate) {
      return new Error("User not found");
    }
    userToUpdate.user_name = user.user_name ? user.user_name : userToUpdate.user_name;
    userToUpdate.user_email = user.user_email ? user.user_email : userToUpdate.user_email;
    userToUpdate.user_password = user.user_password ? user.user_password : userToUpdate.user_password;
    userToUpdate.user_login = user.user_login ? user.user_login : userToUpdate.user_login;
    userToUpdate.user_tipo = user.user_tipo ? user.user_tipo : userToUpdate.user_tipo;
    await userRepository.update(user.id, userToUpdate);
    return userToUpdate;
  }
}