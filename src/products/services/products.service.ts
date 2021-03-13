import { CRUD } from "../../common/crud.interface";
import { GenericInMemoryDao } from "../daos/in.memory.dao";

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

  list(limit: number, page: number) {
    return this.dao.getProducts();
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
