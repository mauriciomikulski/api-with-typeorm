import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/Users/DeleteUserService'; 

export class DeleteUserController {/* <snippet> */
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