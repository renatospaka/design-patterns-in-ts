import Product from "../../domain/entity/product";
import FindProductUsecase from "./find.product.usecase";

const product = new Product("p1", "Product 1", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product usecase", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProduct = new FindProductUsecase(productRepository);

    const input = {
      id: "p1",
    };
    const output = {
      id: "p1",
      name: "Product 1",
      price: 100,
    };
    const result = await findProduct.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("product not found");      
    });
    const findProduct = new FindProductUsecase(productRepository);

    const input =  {
      id: "p1",
    };

    expect(() => {
      return findProduct.execute(input);
    }).rejects.toThrow("product not found");
  });
});
