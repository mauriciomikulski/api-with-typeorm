import { Request, Response } from 'express';
import * as logging from '../../utils/LogHelper';
import { DeleteUserService } from '../../services/Users/DeleteUserService';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';

export class DeleteUserController {
  protected NAMESPACE: string = "Users";
  constructor() { logging.log(this.NAMESPACE, "DeleteUserController", LOG_CONSTANTS.LOG_LEVEL.INFO); }
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    try {
      const deleteUser = await DeleteUserService.execute(id);
      return response.status(200).json(deleteUser);
    } catch (error) {
      return response.status(400).json({
        name: error.name,
        message: "\u{1F6AB} " + error.message || 'Unexpected error.'
      });
    }
  }
}