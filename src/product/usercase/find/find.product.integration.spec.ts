import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../infrastructure/repository/product.repository";
import FindProductUsecase from "./find.product.usecase";

describe("Test find product usecase", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const findProduct = new FindProductUsecase(productRepository);

    const product = new Product("p1", "Product 1", 100);
    await productRepository.create(product);
    
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
});
