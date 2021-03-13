import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";

export class ProductsRoutes implements CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application) {
    this.app = app;
    this.name = "ProductsRoutes";
    this.configureRoutes();
  }

  configureRoutes(): void {
    this.app.get("/products", (req: express.Request, res: express.Response) => {
      res.status(200).send("List of products");
    });
  }

  getName(): string {
    return this.name;
  }
}
