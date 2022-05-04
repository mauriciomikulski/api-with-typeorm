import { log } from "../../utils/LogHelper";
import { LOG_CONSTANTS } from "../../configs/constants/LogConstants";
import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";

type UsersGetOne = { id: string };

export class GetOneUserService {
  static async execute(id: UsersGetOne): Promise<Users | Error> {
    const NAMESPACE = "GetOneUserService";
    log(NAMESPACE, `Getting user with id: ${id.id}`, LOG_CONSTANTS.LOG_LEVEL.INFO);
    const userRepository = appDataSource.getRepository<Users>(Users);
    const user = await userRepository.findOneBy(id);
    if (!user) { 
      log(NAMESPACE, `User with id: ${id.id} not found`, LOG_CONSTANTS.LOG_LEVEL.ERROR);
      return new Error("Usuário não encontrado") 
    }
    return user;
  }
}