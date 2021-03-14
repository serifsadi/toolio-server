import express from "express";
import { ProductsService } from "../services/products.service";

export class ProductsController {
  async filterProducts(req: express.Request, res: express.Response) {
    const productsService = ProductsService.getInstance();
    const products = await productsService.list(250, ["id", "title"], 0);
    res.status(200).send(products);
  }
}
