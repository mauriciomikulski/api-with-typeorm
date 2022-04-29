import { Request, Response } from 'express';
import { log } from '../../utils/LogHelper';
import { LOG_CONSTANTS } from '../../configs/constants/LogConstants';
import { ResetPasswordService } from '../../services/Auth/ResetPasswordService';

export class ResetPasswordController {
  protected NAMESPACE: string = "ResetPasswordController";
  constructor() { log(this.NAMESPACE, "ResetPasswordController", LOG_CONSTANTS.LOG_LEVEL.INFO); }
  static async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { user_password, user_password_match } = request.body;
    console.log(id, user_password, user_password_match);
    if (user_password_match !== user_password) {
      return response.status(400).json({ error: "Passwords do not match" });
    } else {
      const user = { id, user_password };
      await ResetPasswordService.execute(user);
      return response.status(200).json("Password reseted");
    }
  }
}