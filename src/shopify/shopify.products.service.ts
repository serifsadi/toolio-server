import async from "async";
import parseLinkHeader from "parse-link-header";
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
  fetchProducts(limit: number = 250, page = 0, fields?: string[]) {
    let reqUrl = `${this.endpoint}/products.json?limit=${limit}`;
    if (fields && fields.length > 0) {
      const _fields = fields.join(",");
      reqUrl += `&fields=${_fields}`;
    }
    let pageCount = 0;
    let hasNextPage = true;
    let products: any[] = [];

    return new Promise((resolve, reject) => {
      const test = (cb: (err: any, truth: boolean) => boolean) => {
        return cb(null, hasNextPage);
      };
      const iteratee = (callback: any) => {
        request(reqUrl, { json: true }, (err, res, body) => {
          if (err) {
            reject(err);
          }

          products.push(...body.products);

          if (page === -1) {
            // it means DONT follow cursor-based pagination
            hasNextPage = false;
          } else if (page === 0) {
            // it means follow cursor-based pagination and get all pages
          } else {
            pageCount++;
          }

          // Link: "<https://{shop}.myshopify.com/admin/api/{version}/products.json?page_info={page_info}&limit={limit}>; rel={next}, <https://{shop}.myshopify.com/admin/api/{version}/products.json?page_info={page_info}&limit={limit}>; rel={previous}"
          if (res.headers.link) {
            const link = parseLinkHeader(res.headers.link.toString());
            if (link && link.next && link.next.page_info) {
              reqUrl += `&page_info=${link.next.page_info}`;
              hasNextPage = page === 0 || pageCount < page;
            } else {
              hasNextPage = false;
            }
          } else {
            hasNextPage = false;
          }

          // errors: 'Exceeded 2 calls per second for api client. Reduce request rates to resume uninterrupted service.'
          setTimeout(callback, 500);
        });
      };
      const callback = () => {
        resolve(products);
      };
      async.whilst(test, iteratee, callback);
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
