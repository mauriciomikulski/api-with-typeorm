import { Request, Response } from 'express';
import { SignAuthService } from '../../services/Auth/SignAuthService';

export class SignAuthController {
  static async handle(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.body;
      await SignAuthService.sign(user, (error, token, userMatch) => {
        if (error) {
          return res.status(401).json({
            message: error.message
          });

        } else if (token) {
          return res.status(200).json({
            message: 'User Authorized',
            token: token,
            token_type: 'Bearer',
            expiresIn: 43199,
            user: userMatch
          });
        }
      });
    } catch (error) {
      return res.status(400).json({ message: error.message || 'Unexpected error.' });
    }
  }
}