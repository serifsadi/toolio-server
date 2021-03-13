import express from "express";
import { ProductsService } from "../services/products.service";

export class ProductsController {
  listProducts(req: express.Request, res: express.Response) {
    const productsService = ProductsService.getInstance();
    const products = productsService.list(250, 0);
    res.status(200).send(products);
  }
}
