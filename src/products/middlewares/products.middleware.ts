import express from "express";

export class ProductsMiddleware {
  private static instance: ProductsMiddleware;

  static getInstance() {
    if (!ProductsMiddleware.instance) {
      ProductsMiddleware.instance = new ProductsMiddleware();
    }
    return ProductsMiddleware.instance;
  }

  validateRequiredQueryParams(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.query.keyword) {
      next();
    } else {
      res
        .status(400)
        .send({ error: `Missing required query parameter [keyword]` });
    }
  }

  reproduceKeyword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const keyword = req.query.keyword;
    const searchQueries = [];
    searchQueries.push(keyword?.toString().toLowerCase());
    searchQueries.push(keyword?.toString().toUpperCase());
    req.body = {
      searchQueries,
    };
    next();
  }
}
