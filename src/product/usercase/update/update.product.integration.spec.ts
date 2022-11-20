import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../infrastructure/repository/product.repository";
import UpdateProductUsecase from "./update.product.usercase";

const productRepository = new ProductRepository();
const updateProduct = new UpdateProductUsecase(productRepository);

const start = {
  id: "p1",
  name: "Product 1",
  price: 100,
};
const product = new Product(start.id, start.name, start.price);

describe("Test update product usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update an product", async () => {
    const input = {
      id: start.id,
      name: "Not Product 1",
      price: 77.23,
    };
    await productRepository.create(product);

    const output = await updateProduct.execute(input);

    const result = await productRepository.find(input.id);
    expect(output).toEqual({
      id: result.id,
      name: result.name,
      price: result.price,
    });
  });

  it("should throw an error when price is missing", async () => {
    const input = {
      id: start.id,
      name: "Not Product 1",
      price: 0,
    };
    await productRepository.create(product);
    
    await expect(updateProduct.execute(input)).rejects.toThrow("price is required");
  });
});
