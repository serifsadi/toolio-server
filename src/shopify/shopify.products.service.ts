import request from "request";

const API_CONF = {
  STORE_DOMAIN: "c873d395f841c64634c5330ce9118c9d",
  STORE_PASSWORD: "5dcf9317c6ff86ea61d21b0d4dd0a1a8",
  STORE_NAME: "toolio-retail",
  VERSION: "2021-01",
  ADDRESS: `https://{shop}.myshopify.com/admin/api/{version}`,
};

// https://c873d395f841c64634c5330ce9118c9d:5dcf9317c6ff86ea61d21b0d4dd0a1a8@toolio-retail.myshopify.com/admin/api/2021-01/products.json

export class ShopifyProductService {
  private static instance: ShopifyProductService;
  private endpoint: string;

  constructor() {
    const shop = `${API_CONF.STORE_DOMAIN}:${API_CONF.STORE_PASSWORD}@${API_CONF.STORE_NAME}`;
    this.endpoint = API_CONF.ADDRESS.replace("{shop}", shop).replace(
      "{version}",
      API_CONF.VERSION
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
