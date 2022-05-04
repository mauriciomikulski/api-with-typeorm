import { log } from "../../utils/LogHelper";
import { LOG_CONSTANTS } from "../../configs/constants/LogConstants";
import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";

export class DeleteUserService {
  static async execute(id: string): Promise<Users | Error> {
    const NAMESPACE = "DeleteUserService";
    log(NAMESPACE, `Deleting user with id: ${id}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    const userRepository = appDataSource.getRepository<Users>(Users);
    const userToDelete = await userRepository.findOneBy({id});
    if (!userToDelete) {
      log(NAMESPACE, `User with id: ${id} not found`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      return new Error("User not found");
    }
    await userRepository.remove(userToDelete);
    return userToDelete;
  }
}