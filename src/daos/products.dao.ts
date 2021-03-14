import { ShopifyProductService } from "../shopify/shopify.products.service";

export class ProductsDao {
  private static instance: ProductsDao;

  static getInstance() {
    if (!ProductsDao.instance) {
      ProductsDao.instance = new ProductsDao();
    }
    return ProductsDao.instance;
  }

  addProduct(product: any) {}

  async getProducts(limit: number, fields: string[]) {
    const shopifyProductService = ShopifyProductService.getInstance();
    const products = await shopifyProductService.fetchProducts(limit, fields);
    return products;
  }

  getProductById(productId: string) {}

  putProductById(product: any) {}

  patchProductById(product: any) {}

  removeProductById(productId: string) {}
}
