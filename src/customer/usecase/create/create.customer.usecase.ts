import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import { CreateCustomerInputDTO, CreateCustomerOutputDTO } from "./create.customer.dto";
import CustomerFactory from "../../domain/factory/customer.factory";
import Address from "../../domain/valueobject/address";

export default class CreateCustomerUsecase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: CreateCustomerInputDTO): Promise<CreateCustomerOutputDTO> {
    const customer = CustomerFactory.createWithAddress(
      input.name, 
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
      )
    );

    await this.customerRepository.create(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
