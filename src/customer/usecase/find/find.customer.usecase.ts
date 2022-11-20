import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { FindCustomerInputDTO, FindCustomerOutputDTO } from "./find.customer.dto";

export default class FindCustomerUsecase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: FindCustomerInputDTO): Promise<FindCustomerOutputDTO> {
    const customer = await this.customerRepository.find(input.id);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        zip: customer.Address.zip,
      }
    };
  }
}
