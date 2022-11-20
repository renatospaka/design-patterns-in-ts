import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import { CreateProductInputDTO, CreateProductOutputDTO } from "./create.product.dto";

export default class CreateProductUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const product = new Product(input.id, input.name, input.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
