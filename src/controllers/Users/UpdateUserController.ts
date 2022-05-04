import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/Users/UpdateUserService';

export class UpdateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user_name, user_email, user_password, user_login, user_tipo } = request.body;
    const user = { id, user_name, user_email, user_login, user_password, user_tipo };
    try {
      const updateUser = await UpdateUserService.execute(user);
      return response.status(200).json(updateUser);
    } catch (error) {
      return response.status(400).json({ message: "User not found" });
    }
  }
}
