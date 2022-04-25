import { Request, Response } from 'express';
import { GetAllUsersService } from '../../services/Users/GetAllUsersService';

export class GetAllUsersController {
  static async handle(req: Request, res: Response): Promise<Response> {
    try {
      const users = await GetAllUsersService.execute();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message || 'Unexpected error.' });
    }
  }
}