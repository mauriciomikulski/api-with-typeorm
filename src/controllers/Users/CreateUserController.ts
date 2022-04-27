import { Request, Response } from 'express';
import * as logging from '../../utils/LogHelper';
import { CreateUserService } from '../../services/Users/CreateUserService';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';

export class CreateUserController {/* </snippet> */
  protected NAMESPACE: string = "Users";
  constructor() { logging.log(this.NAMESPACE, "CreateUserController", LOG_CONSTANTS.LOG_LEVEL.INFO); }
  static async handle(req: Request, res: Response): Promise<Response> {

    const { user_nome, user_email, user_login, user_password } = req.body;
    const user = { user_nome, user_email, user_login, user_password };
    try {
      const createdUser = await CreateUserService.execute(user);
      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(400).json({
        name: error.name,
        message: "\u{1F6AB} " + error.message || 'Unexpected error.'
      });
    }
  }
}