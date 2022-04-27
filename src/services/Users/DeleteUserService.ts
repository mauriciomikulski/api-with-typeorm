import { Users } from "../../entity/Users";
import { appDataSource } from "../DataBase/data-source";

export class DeleteUserService {
  static async execute(id: string): Promise<Users | Error> {
    const userRepository = appDataSource.getRepository<Users>(Users);
    const userToDelete = await userRepository.findOneBy({id});
    if (!userToDelete) {
      return new Error("User not found");
    }
    await userRepository.remove(userToDelete);
    return userToDelete;
  }
}