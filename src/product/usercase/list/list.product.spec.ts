import Product from "../../domain/entity/product";
import { CreateProductInputDTO } from "../create/create.product.dto";
import { ListProductInputDTO } from "./list.product.dto";
import ListProductUsecase from "./list.product.usecase";

let data: CreateProductInputDTO;

data = { id: "p1", name: "Product 1", price: 100};
const product1 = new Product(data.id, data.name, data.price);

data = { id: "p2", name: "Product 2", price: 77.23};
const product2 = new Product(data.id, data.name, data.price);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};


describe("Unit test list product usecase", () => {
  it("should list products", async () => {
    const productRepository = MockRepository();
    const listProduct = new ListProductUsecase(productRepository);
    const input: ListProductInputDTO = {};
    const output = await listProduct.execute(input);

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
  });
});
