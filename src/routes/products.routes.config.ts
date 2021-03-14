import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import { ProductsController } from "../controllers/products.controller";
import { ProductsMiddleware } from "../middlewares/products.middleware";

export class ProductsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "ProductsRoutes");
  }

  configureRoutes() {
    const productsController = new ProductsController();
    const productsMiddleware = new ProductsMiddleware();

    this.app.get("/products", [
      productsMiddleware.validateRequiredQueryParams,
      productsMiddleware.reproduceKeyword,
      productsController.filterProducts,
    ]);

    return this.app;
  }
}
