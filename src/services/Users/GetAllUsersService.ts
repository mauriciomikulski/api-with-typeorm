import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";

export class GetAllUsersService {
  static async execute(): Promise<Users[] | Error> {
    const userRepository = appDataSource.getRepository<Users>(Users);
    const users = await userRepository.find();
    return users;
  }
}