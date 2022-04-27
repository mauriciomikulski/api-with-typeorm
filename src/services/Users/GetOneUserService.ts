import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";

type UsersGetOne = { id: string };

export class GetOneUserService {
  static async execute(id: UsersGetOne): Promise<Users | Error> {
    const userRepository = appDataSource.getRepository<Users>(Users);
    const user = await userRepository.findOneBy(id);
    if (!user) { return new Error("Usuário não encontrado") }
    return user;
  }
}