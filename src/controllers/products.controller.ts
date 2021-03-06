import express from "express";
import FilterService from "../services/filter.service";
import { ProductsService } from "../services/products.service";

export class ProductsController {
  async filterProducts(req: express.Request, res: express.Response) {
    const productsService = ProductsService.getInstance();
    const filterService = FilterService.getInstance();

    let products: any = await productsService.list(250, 0, ["id", "title"]);

    if (req.query.keyword) {
      const keyword = req.query.keyword.toString();
      if (products) {
        products = filterService.filter(products, "title", keyword);
      }
    }

    res.status(200).send(products);
  }
}
