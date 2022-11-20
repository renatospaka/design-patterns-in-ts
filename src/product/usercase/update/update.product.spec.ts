import Product from "../../domain/entity/product";
import UpdateProductUsecase from "./update.product.usercase";

const start = {
  id: "p1",
  name: "Product 1",
  price: 100,
};
const product = new Product(start.id, start.name, start.price);

const input = {
  id: start.id,
  name: "Not Product 1",
  price: 77.23,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update product usecase", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const updateProduct = new UpdateProductUsecase(productRepository);

    const output = await updateProduct.execute(input);
    expect(output).toEqual(input);
  });
});
