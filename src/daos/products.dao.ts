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

  async getProducts(limit: number, page: number, fields: string[]) {
    const shopifyProductService = ShopifyProductService.getInstance();
    try {
      const products = await shopifyProductService.fetchProducts(
        limit,
        page,
        fields
      );
      return products;
    } catch (error) {
      return error;
    }
  }

  getProductById(productId: string) {}

  putProductById(product: any) {}

  patchProductById(product: any) {}

  removeProductById(productId: string) {}
}
