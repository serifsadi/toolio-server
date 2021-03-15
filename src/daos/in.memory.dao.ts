export class GenericInMemoryDao {
  private static instance: GenericInMemoryDao;
  products: any = [];

  static getInstance(): GenericInMemoryDao {
    if (!GenericInMemoryDao.instance) {
      GenericInMemoryDao.instance = new GenericInMemoryDao();
    }
    return GenericInMemoryDao.instance;
  }

  addProduct(product: any) {
    return this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId: string) {
    return this.products.find(
      (product: { id: string }) => product.id === productId
    );
  }

  putProductById(product: any) {
    const objIndex = this.products.findIndex(
      (obj: { id: any }) => obj.id === product.id
    );

    this.products = [
      ...this.products.slice(0, objIndex),
      product,
      ...this.products.slice(0, objIndex + 1),
    ];

    return `${product.id} updated via put`;
  }

  patchProductById(product: any) {
    const objIndex = this.products.findIndex(
      (obj: { id: any }) => obj.id === product.id
    );

    let currentProduct = this.products[objIndex];
    for (let prop in product) {
      if (prop !== "id") {
        currentProduct[prop] = product[prop];
      }
    }

    this.products = [
      ...this.products.slice(0, objIndex),
      product,
      ...this.products.slice(0, objIndex + 1),
    ];

    return `${product.id} patched`;
  }

  removeProductById(productId: string) {
    const objIndex = this.products.findIndex(
      (obj: { id: any }) => obj.id === productId
    );

    this.products = this.products.slice(objIndex, 1);

    return `${productId} removed`;
  }
}
