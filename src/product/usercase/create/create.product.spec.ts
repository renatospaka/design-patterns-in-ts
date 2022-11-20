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
});
