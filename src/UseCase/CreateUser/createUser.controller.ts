import { Request, Response } from "express";
import { CreateUser } from "../../UseCase/CreateUser/createUser.usecase";

export class CreateUserController {

  constructor(
    private createUser: CreateUser
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {

    const { name, login, email, password, tipo } = req.body;

    try {

      await this.createUser.execute({
        name,
        email,
        login,
        password,
        tipo
      });

      return res.status(201).send();

    } catch (err) {

      return res.status(400).json({
        message: err.message || 'Unexpected error'
      });

    }
  }
}