import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import { UpdateProductInputDTO, UpdateProductOutputDTO } from "./update.product.dto";

export default class UpdateProductUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: UpdateProductInputDTO): Promise<UpdateProductOutputDTO> {
    const product = await this.productRepository.find(input.id);
    product.changeName(input.name);
    product.changePrice(input.price);

    await this.productRepository.update(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
