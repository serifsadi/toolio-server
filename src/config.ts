import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const shopifyCredentials = {
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN,
  storePassword: process.env.SHOPIFY_STORE_PASSWORD,
  storeName: process.env.SHOPIFY_STORE_NAME,
};
const shopifyApiVersion = process.env.SHOPIFY_API_VERSION;

export { port, shopifyCredentials, shopifyApiVersion };
