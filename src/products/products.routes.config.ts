import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { ProductsController } from "./controllers/products.controller";
import { ProductsMiddleware } from "./middlewares/products.middleware";

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
    const productsMiddleware = new ProductsMiddleware();

    this.app.get("/products", [
      productsMiddleware.validateRequiredQueryParams,
      productsMiddleware.reproduceKeyword,
      productsController.filterProducts,
    ]);
  }

  getName(): string {
    return this.name;
  }
}
