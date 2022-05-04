import { Request, Response } from 'express';
import { log } from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { ForgotPasswordService } from '../../services/Auth/ForgotPasswordService';

export class ForgotPasswordController {
  static async handle(request: Request, response: Response): Promise<Response> {
    const user = request.body;
    try {
      await ForgotPasswordService.execute(user);
      return response.status(200).json("Email sent");
    } catch (error) {
      return response.status(400).json({ message: "User not found" });
    }
  }
}