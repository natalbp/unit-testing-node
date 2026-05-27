class ProductService {
  constructor(productRepository) {
    this.repository = productRepository;
  }

  async getById(id) {
    const product = await this.repository.findById(id);
    if (!product) {
      throw new Error(`Product with id "${id}" not found`);
    }
    return product;
  }

  async getByCategory(category) {
    const products = await this.repository.findAll();
    return products.filter((product) => product.category === category);
  }

  async searchByName(query) {
    if (!query || query.trim() === "") {
      throw new Error("Search query cannot be empty");
    }
    const products = await this.repository.findAll();
    return products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async create(productData) {
    if (!productData.name) {
      throw new Error("Product name is required");
    }
    if (productData.price === undefined || productData.price === null) {
      throw new Error("Product price is required");
    }
    if (productData.price <= 0) {
      throw new Error("Product price must be greater than 0");
    }
    return await this.repository.save(productData);
  }
}

module.exports = ProductService;