import request from "request";
import { shopifyApiVersion, shopifyCredentials } from "../config";

const API_ENDPOINT_TEMPLATE = `https://{shop}.myshopify.com/admin/api/{version}`;

export class ShopifyProductService {
  private static instance: ShopifyProductService;
  private endpoint: string;

  constructor() {
    const shop = `${shopifyCredentials.storeDomain}:${shopifyCredentials.storePassword}@${shopifyCredentials.storeName}`;
    const version = shopifyApiVersion || "2021-01";

    this.endpoint = API_ENDPOINT_TEMPLATE.replace("{shop}", shop).replace(
      "{version}",
      version
    );
  }

  static getInstance() {
    if (!ShopifyProductService.instance) {
      ShopifyProductService.instance = new ShopifyProductService();
    }
    return ShopifyProductService.instance;
  }

  // GET /admin/api/2021-01/products.json
  fetchProducts(limit: number = 250, fields?: string[]) {
    let reqUrl = `${this.endpoint}/products.json?limit=${limit}`;
    if (fields && fields.length > 0) {
      const _fields = fields.join(",");
      reqUrl += `&fields=${_fields}`;
    }
    return new Promise((resolve, reject) => {
      request(reqUrl, { json: true }, (err, res, body) => {
        if (err) {
          console.log("err", err);
          reject(err);
        }
        resolve(body.products);
      });
    });
  }

  // GET /admin/api/2021-01/products/count.json
  fetchProductsCount() {
    const reqUrl = `${this.endpoint}/products/count.json`;
  }

  // GET /admin/api/2021-01/products/{product_id}.json
  fetchProduct() {
    const reqUrl = `${this.endpoint}/products/{product_id}.json`;
  }

  // POST /admin/api/2021-01/products.json
  createProduct() {
    const reqUrl = `${this.endpoint}/products.json`;
  }

  // PUT /admin/api/2021-01/products/{product_id}.json
  updateProduct() {
    const reqUrl = `${this.endpoint}/products/{product_id}.json`;
  }

  // DELETE /admin/api/2021-01/products/{product_id}.json
  deleteProduct() {
    const reqUrl = `${this.endpoint}/products/{product_id}.json`;
  }
}
