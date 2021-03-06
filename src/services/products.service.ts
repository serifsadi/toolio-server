import { CRUD } from "../common/crud.interface";
import { GenericInMemoryDao } from "../daos/in.memory.dao";
import { ProductsDao } from "../daos/products.dao";

export class ProductsService implements CRUD {
  private static instance: ProductsService;
  dao: GenericInMemoryDao;

  constructor() {
    this.dao = GenericInMemoryDao.getInstance();
  }

  static getInstance() {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }
    return ProductsService.instance;
  }

  create(resource: any) {
    return this.dao.addProduct(resource);
  }

  deleteById(resourceId: any) {
    return this.dao.removeProductById(resourceId);
  }

  list(limit: number, page: number, fields: string[]) {
    // return this.dao.getProducts();
    return ProductsDao.getInstance().getProducts(limit, page, fields);
  }

  patchById(resource: any) {
    return this.dao.patchProductById(resource);
  }

  readById(resourceId: any) {
    return this.dao.getProductById(resourceId);
  }

  updateById(resource: any) {
    return this.dao.putProductById(resource);
  }
}
