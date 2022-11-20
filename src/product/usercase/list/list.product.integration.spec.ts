import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/product";
import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import ProductRepository from "../../infrastructure/repository/product.repository";
import { CreateProductInputDTO } from "../create/create.product.dto";
import { ListProductInputDTO } from "./list.product.dto";
import ListProductUsecase from "./list.product.usecase";

let data: CreateProductInputDTO;

data = { id: "p1", name: "Product 1", price: 100};
const product1 = new Product(data.id, data.name, data.price);

data = { id: "p2", name: "Product 2", price: 77.23};
const product2 = new Product(data.id, data.name, data.price);

describe("Test list product usecase", () => {
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

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);
    const products = await productRepository.findAll();

    const listProduct = new ListProductUsecase(productRepository);
    const input: ListProductInputDTO = {};
    const output = await listProduct.execute(input);

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(products[0].id);
    expect(output.products[0].name).toBe(products[0].name);
    expect(output.products[1].id).toBe(products[1].id);
    expect(output.products[1].name).toBe(products[1].name);
  });
});
