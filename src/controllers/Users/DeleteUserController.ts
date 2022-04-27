import { Request, Response } from 'express';
import * as logging from '../../utils/log.helper';
import { DeleteUserService } from '../../services/Users/DeleteUserService';
import { LOG_CONSTANTS } from '../../configs/constants/log.constants';

export class DeleteUserController {
  protected NAMESPACE: string = "Users";
  constructor() { logging.log(this.NAMESPACE, "DeleteUserController", LOG_CONSTANTS.LOG_LEVEL.INFO); }
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = await DeleteUserService.execute(id);
    return response.json(deleteUser);
  }
}