import { DbEnum } from "../../configs/enums/db.enum";
import { Users } from "../../entity/Users";
import { FactoryGetConn } from "../../factory/FactoryGetConn";

export class GetAllUsersService {
  static async execute(): Promise<Users[] | Error> {
    const conn = await FactoryGetConn.getConn(DbEnum.MYSQL);
    const conector = await conn.connect();
    conector.initialize();
    const userRepository = conector.getRepository<Users>(Users);
    const users = await userRepository.find();
    return users;
  }
}