import { CommonRoutes } from './CommonRoutes';
import { CreateUserController } from '../controllers/Users/CreateUserController';
import express, { Application } from 'express';
import { ROUTES_CONSTANTS } from '../configs/constants/RoutesContants';
import { GetAllUsersController } from '../controllers/Users/GetAllUsersController';

export class UsersRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, "UsersRoutes");
  }

  initRoutes(): Application {
    this.app.route(ROUTES_CONSTANTS.users.create)
      .post(CreateUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.getAll)
      .get(GetAllUsersController.handle);
    return this.app;
  }
}