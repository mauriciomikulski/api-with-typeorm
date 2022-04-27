import { Application } from 'express';
import { ROUTES_CONSTANTS } from '../configs/constants/RoutesContants';
import { CommonRoutes } from './CommonRoutes';
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
      .post(CreateUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.getAll)
      .get(GetAllUsersController.handle);
    this.app.route(ROUTES_CONSTANTS.users.getById)
      .get(GetOneUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.update)
      .put(UpdateUserController.handle);
    this.app.route(ROUTES_CONSTANTS.users.delete)
      .delete(DeleteUserController.handle);
    return this.app;
  }
}