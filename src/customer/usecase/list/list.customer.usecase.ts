import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { ListCustomerInputDTO, ListCustomerOutputDTO } from "./list.customer.dto";

export default class ListCustomerUsecase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: ListCustomerInputDTO): Promise<ListCustomerOutputDTO> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): ListCustomerOutputDTO {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          city: customer.Address.city,
          zip: customer.Address.zip,
        }
      })),
    };
  }
}
