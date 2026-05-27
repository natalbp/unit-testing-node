const ProductService = require("./productService");

describe("ProductService", () => {
  let mockRepository;
  let service;

  const sampleProducts = [
    { id: 1, name: "Gaming Mouse", category: "electronics", price: 59.99 },
    { id: 2, name: "Mechanical Keyboard", category: "electronics", price: 129.99 },
    { id: 3, name: "Yoga Mat", category: "sports", price: 25.0 },
    { id: 4, name: "Running Shoes", category: "sports", price: 89.99 },
    { id: 5, name: "Mouse Pad XL", category: "accessories", price: 15.0 },
  ];

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };
    service = new ProductService(mockRepository);
    jest.clearAllMocks();
  });


  describe("getById", () => {
    test("returns the product when it exists", async () => {
      const product = sampleProducts[0];
      mockRepository.findById.mockResolvedValue(product);

      const result = await service.getById(1);

      expect(result).toEqual(product);
    });

    test("throws an error when the product does not exist", async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getById(99)).rejects.toThrow(
        'Product with id "99" not found'
      );
    });

    test("calls the repository with the correct id", async () => {
      mockRepository.findById.mockResolvedValue(sampleProducts[1]);

      await service.getById(2);

      expect(mockRepository.findById).toHaveBeenCalledWith(2);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });
  });


  describe("getByCategory", () => {
    test("returns only the products that match the category", async () => {
      mockRepository.findAll.mockResolvedValue(sampleProducts);

      const result = await service.getByCategory("electronics");

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.category === "electronics")).toBe(true);
    });

    test("returns an empty array when no products match the category", async () => {
      mockRepository.findAll.mockResolvedValue(sampleProducts);

      const result = await service.getByCategory("furniture");

      expect(result).toEqual([]);
    });
  });

  // ─────────────────────────────────────────────
  // searchByName
  // ─────────────────────────────────────────────
  describe("searchByName", () => {
    test("returns products whose name contains the query", async () => {
      mockRepository.findAll.mockResolvedValue(sampleProducts);

      const result = await service.searchByName("mouse");

      expect(result).toHaveLength(2); // Gaming Mouse + Mouse Pad XL
      expect(result.map((p) => p.id)).toEqual(expect.arrayContaining([1, 5]));
    });

    test("search is case-insensitive", async () => {
      mockRepository.findAll.mockResolvedValue(sampleProducts);

      const result = await service.searchByName("YOGA");

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Yoga Mat");
    });

    test("throws an error when query is empty", async () => {
      await expect(service.searchByName("")).rejects.toThrow(
        "Search query cannot be empty"
      );
    });

    test("throws an error when query is only whitespace", async () => {
      await expect(service.searchByName("   ")).rejects.toThrow(
        "Search query cannot be empty"
      );
    });
  });


  describe("create", () => {
    test("calls save() and returns the saved product when data is valid", async () => {
      const productData = { name: "Webcam HD", price: 79.99, category: "electronics" };
      const savedProduct = { id: 6, ...productData };
      mockRepository.save.mockResolvedValue(savedProduct);

      const result = await service.create(productData);

      expect(result).toEqual(savedProduct);
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledWith(productData);
    });

    test("throws an error when price is negative", async () => {
      const productData = { name: "Broken Item", price: -10 };

      await expect(service.create(productData)).rejects.toThrow(
        "Product price must be greater than 0"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    test("throws an error when price is zero", async () => {
      const productData = { name: "Free Item", price: 0 };

      await expect(service.create(productData)).rejects.toThrow(
        "Product price must be greater than 0"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    test("throws an error when name is missing", async () => {
      const productData = { price: 49.99 };

      await expect(service.create(productData)).rejects.toThrow(
        "Product name is required"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    test("throws an error when price is missing", async () => {
      const productData = { name: "No Price Product" };

      await expect(service.create(productData)).rejects.toThrow(
        "Product price is required"
      );
      expect(mockRepository.save).not.toHaveBeenCalled();
    });

    test("save() is called exactly once with valid data", async () => {
      const productData = { name: "Headphones", price: 199.99 };
      mockRepository.save.mockResolvedValue({ id: 7, ...productData });

      await service.create(productData);

      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});