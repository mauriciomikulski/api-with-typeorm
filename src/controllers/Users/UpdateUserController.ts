import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/Users/UpdateUserService';

export class UpdateUserController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user_name, user_email, user_password, user_login, user_tipo } = request.body;
    const user = { id, user_name, user_email, user_login, user_password, user_tipo };
    const updateUser = await UpdateUserService.execute(user);
    if (updateUser instanceof Error) {
      return response.status(400).json({ error: updateUser.message });
    }
    return response.json(updateUser);
  }
}
