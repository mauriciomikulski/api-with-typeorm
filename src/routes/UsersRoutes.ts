import { Application } from 'express';
import { ROUTES_CONSTANTS } from '../configs/constants/RoutesContants';
import { CommonRoutes } from './CommonRoutes';
import { ExtractTokenProvider } from '../providers/ExtractTokenProvider';
import { CreateUserController } from '../controllers/Users/CreateUserController';
import { GetAllUsersController } from '../controllers/Users/GetAllUsersController';
import { GetOneUserController } from '../controllers/Users/GetOneUserController';
import { UpdateUserController } from '../controllers/Users/UpdateUserController';
import { DeleteUserController } from '../controllers/Users/DeleteUserController';

export class UsersRoutes extends CommonRoutes {
  constructor(app: Application) {
    super(app, "UsersRoutes");
  }

  initRoutes(): Application {
    this.app.route(ROUTES_CONSTANTS.users.create)
      .post(ExtractTokenProvider.extract, CreateUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.getAll)
      .get(ExtractTokenProvider.extract, GetAllUsersController.handle);
    this.app.route(ROUTES_CONSTANTS.users.getById)
      .get(ExtractTokenProvider.extract, GetOneUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.update)
      .put(ExtractTokenProvider.extract, UpdateUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.delete)
      .delete(ExtractTokenProvider.extract, DeleteUserController.handle);
    return this.app;
  }
}