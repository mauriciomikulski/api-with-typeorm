import { log } from "../../utils/LogHelper";
import { LOG_CONSTANTS } from "../../configs/constants/LogConstants";
import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";

export class GetAllUsersService {
  static async execute(): Promise<Users[] | Error> {
    const NAMESPACE = "GetAllUsersService";
    log(NAMESPACE, `Getting all users`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    const userRepository = appDataSource.getRepository<Users>(Users);
    const users = await userRepository.find();
    if (!users) {
      log(NAMESPACE, `Users not found`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      return new Error("Users not found");
    }
    return users;
  }
}