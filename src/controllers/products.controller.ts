import express from "express";
import FilterService from "../services/filter.service";
import { ProductsService } from "../services/products.service";

export class ProductsController {
  async filterProducts(req: express.Request, res: express.Response) {
    const productsService = ProductsService.getInstance();
    const filterService = FilterService.getInstance();

    let products: any = await productsService.list(250, ["id", "title"], 0);

    if (req.query.keyword) {
      const keyword = req.query.keyword.toString();
      products = filterService.filter(products, "title", keyword);
    }

    res.status(200).send(products);
  }
}
