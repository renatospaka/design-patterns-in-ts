import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import { FindProductInputDTO, FindProductOutputDTO } from "./find.product.dto";

export default class FindProductUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
