import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../infrastructure/repository/product.repository";
import CreateProductUsecase from "./create.product.usercase";

const input = {
  id: "p1",
  name: "Product 1",
  price: 100,
};

describe("Test create product usecase", () => {
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
  
  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const createProduct = new CreateProductUsecase(productRepository);
    const output = await createProduct.execute(input);

    const result = await productRepository.find(input.id);
    expect(output).toEqual({
      id: result.id,
      name: result.name,
      price: result.price,
    });
  });

  it("should throw an error when id is missing", async () => {
    const productRepository = new ProductRepository();
    const createProduct = new CreateProductUsecase(productRepository);
    
    input.id = "";
    await expect(createProduct.execute(input)).rejects.toThrow("id is required");
  });
});
