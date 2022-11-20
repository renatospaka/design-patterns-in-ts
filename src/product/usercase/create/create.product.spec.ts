import CreateProductUsecase from "./create.product.usercase";

const input = {
  id: "p1",
  name: "Product 1",
  price: 100,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product usecase", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProduct = new CreateProductUsecase(productRepository);

    const output = await createProduct.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when id is missing", async () => {
    const productRepository = MockRepository();
    const createProduct = new CreateProductUsecase(productRepository);
    input.id = "";

    await expect(createProduct.execute(input)).rejects.toThrow("id is required");
  });

  it("should throw an error when price is negative", async () => {
    const productRepository = MockRepository();
    const createProduct = new CreateProductUsecase(productRepository);
    input.id = "p1";
    input.price = -10;

    await expect(createProduct.execute(input)).rejects.toThrow("price must be greater than zero");
  });
});
