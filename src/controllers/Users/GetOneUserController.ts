import { Request, Response } from 'express';
import { GetOneUserService } from '../../services/Users/GetOneUserService';

export class GetOneUserController {
  static async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await GetOneUserService.execute({ id });
    if (user instanceof Error) {
      return res.status(400).json({ error: user.message });
    }
    return res.json(user);
  }
}
