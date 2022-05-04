import { Application } from 'express';
import { ROUTES_CONSTANTS } from '../configs/constants/RoutesContants';
import { CommonRoutes } from './CommonRoutes';
import { SignAuthController } from '../controllers/Auth/SignAuthController';
import { ForgotPasswordController } from '../controllers/Auth/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/Auth/ResetPasswordController';

export class AuthRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  initRoutes(): Application {
    this.app.route(ROUTES_CONSTANTS.auth.login)
      .post(SignAuthController.handle);
    this.app.route(ROUTES_CONSTANTS.auth.forgotPassword)
      .post(ForgotPasswordController.handle);
    this.app.route(ROUTES_CONSTANTS.auth.resetPassword)
      .post(ResetPasswordController.handle);
    return this.app;
  }
  
}