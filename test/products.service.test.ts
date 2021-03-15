import { expect } from "chai";
import { ProductsService } from '../src/services/products.service';

describe("Products Service Test", () => {
  let productsService: ProductsService;

  it('ProductsService is defined', () => {
    expect(ProductsService).to.not.be.undefined;
  });

  beforeEach(() => {
    productsService = ProductsService.getInstance();
  });

  describe('#list products with all fields', () => {

    let products: any[] = [];

    afterEach(() => {
      products.every((p: any) => {
        expect(Object.keys(p)).to.have.lengthOf(18)
        expect(p).to.have.keys([
          'id', 'title',
          'body_html', 'vendor',
          'product_type', 'created_at',
          'handle', 'updated_at',
          'published_at', 'template_suffix',
          'status', 'published_scope',
          'tags', 'admin_graphql_api_id',
          'variants', 'options',
          'images', 'image'
        ]);
      });
    });

    it("should get all products - follow cursor-based pagination", async () => {

      products = await productsService.list(250, 0, [])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(933)

    });

    it("should get 250 products - DON'T follow cursor-based pagination", async () => {

      products = await productsService.list(250, -1, [])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(250)

    });

    it("should get 15 products - DON'T follow cursor-based pagination", async () => {

      products = await productsService.list(15, -1, [])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(15)

    });

    it("should get 15 products - follow 1 time cursor-based pagination", async () => {

      products = await productsService.list(15, 1, [])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(15)

    });

    it("should get 30 products - follow 2 time cursor-based pagination", async () => {

      products = await productsService.list(15, 2, [])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(30)

    });

    it("should get 60 products - follow 4 time cursor-based pagination", async () => {

      products = await productsService.list(15, 4, [])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(60)

    });

  });

  describe('#list products with [id] and [title] fields', () => {

    let products: any[] = [];

    afterEach(() => {
      products.every((p: any) => {
        expect(Object.keys(p)).to.have.lengthOf(2)
        expect(p).to.have.keys(['id', 'title'])
      });
    });

    it("should get all products - follow cursor-based pagination", async () => {

      products = await productsService.list(250, 0, ['id', 'title'])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(933)

    });

    it("should get 250 products - DON'T follow cursor-based pagination", async () => {

      products = await productsService.list(250, -1, ['id', 'title'])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(250)

    });

    it("should get 15 products - DON'T follow cursor-based pagination", async () => {

      products = await productsService.list(15, -1, ['id', 'title'])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(15)

    });

    it("should get 15 products - follow 1 time cursor-based pagination", async () => {

      products = await productsService.list(15, 1, ['id', 'title'])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(15)

    });

    it("should get 30 products - follow 2 time cursor-based pagination", async () => {

      products = await productsService.list(15, 2, ['id', 'title'])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(30)

    });

    it("should get 60 products - follow 4 time cursor-based pagination", async () => {

      products = await productsService.list(15, 4, ['id', 'title'])

      expect(products).to.be.an('array')
      expect(products).to.have.lengthOf(60)

    });

  });

});
