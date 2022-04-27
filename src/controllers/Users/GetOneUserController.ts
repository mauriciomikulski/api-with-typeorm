import { Request, Response } from 'express';
import * as logging from '../../utils/LogHelper';
import { GetOneUserService } from '../../services/Users/GetOneUserService';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';

export class GetOneUserController {
  protected NAMESPACE: string = "Users";
  constructor() { logging.log(this.NAMESPACE, "GetOneUserUserController", LOG_CONSTANTS.LOG_LEVEL.INFO); }
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await GetOneUserService.execute({ id });
    if (user instanceof Error) {
      return res.status(400).json({ error: user.message });
    }
    return res.json(user);
  }
}
