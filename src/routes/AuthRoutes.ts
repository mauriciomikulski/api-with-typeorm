import { Application } from 'express';
import { ROUTES_CONSTANTS } from '../configs/constants/RoutesContants';
import { CommonRoutes } from './CommonRoutes';
import { SignAuthController } from '../controllers/Auth/SignAuthController';

export class AuthRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, "AuthRoutes");
  }

  initRoutes(): Application {
    this.app.route(ROUTES_CONSTANTS.auth.login)
      .post(SignAuthController.handle);
    return this.app;
  }
}