import { Request, Response } from 'express';
import { CreateUserService } from '../../services/Users/CreateUserService';

export class CreateUserController {
  
  static async handle(req: Request, res: Response): Promise<Response> {
    const { user_nome, user_email, user_login, user_password } = req.body;
    const user = { user_nome, user_email, user_login, user_password };
    try {
      const createdUser = await CreateUserService.execute(user);
      return res.json(createdUser);
    } catch (error) {
      return res.status(400).json({ name: error.name, message: "\u{1F6AB} " + error.message || 'Unexpected error.' });
    }
  }
}