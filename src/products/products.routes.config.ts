import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { ProductsController } from "./controllers/products.controller";

export class ProductsRoutes implements CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application) {
    this.app = app;
    this.name = "ProductsRoutes";
    this.configureRoutes();
  }

  configureRoutes(): void {
    const productsController = new ProductsController();

    this.app.get("/products", [
      productsController.listProducts
    ]);
  }

  getName(): string {
    return this.name;
  }
}
