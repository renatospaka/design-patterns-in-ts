import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import Address from "../../domain/valueobject/address";
import { UpdateCustomerInputDTO, UpdateCustomerOutputDTO } from "./update.customer.dto";

export default class UpdateCustomerUsecase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: UpdateCustomerInputDTO): Promise<UpdateCustomerOutputDTO> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(new Address(
      input.address.street,
      input.address.number,
      input.address.zip,
      input.address.city,
    ));

    await this.customerRepository.update(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}