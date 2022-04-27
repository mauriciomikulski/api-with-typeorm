import { Request, Response } from 'express';
import * as logging from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { GetAllUsersService } from '../../services/Users/GetAllUsersService';

export class GetAllUsersController {
  protected NAMESPACE: string = "Users";
  constructor() { logging.log(this.NAMESPACE, "GetAllUsersUserController", LOG_CONSTANTS.LOG_LEVEL.INFO); }
  static async handle(req: Request, res: Response): Promise<Response> {
    try {
      const users = await GetAllUsersService.execute();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message || 'Unexpected error.' });
    }
  }
}