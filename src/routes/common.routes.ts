import express, { Application, Express, Request, Response } from "express";


export abstract class CommonRoutes {
  app: Application = express();
  name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.initRoutes();
  }

  getName(): string {
    return this.name;
  }

  abstract initRoutes(): Application;
}