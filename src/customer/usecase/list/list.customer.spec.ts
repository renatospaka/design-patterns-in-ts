import CustomerFactory from "../../domain/factory/customer.factory";
import Address from "../../domain/valueobject/address";
import { CreateCustomerInputDTO } from "../create/create.customer.dto";
import { ListCustomerInputDTO } from "./list.customer.dto";
import ListCustomerUsecase from "./list.customer.usecase";

let data: CreateCustomerInputDTO;

data = { name: "John", address: { street: "Street", city: "City", number: 123, zip: "Zip" }};
const customer1 = CustomerFactory.createWithAddress(
  data.name, 
  new Address(
    data.address.street,
    data.address.number,
    data.address.zip,
    data.address.city,
  )
);

data = { name: "Mary", address: { street: "Avenue", city: "Metropoly", number: 4321, zip: "CEP" }};
const customer2 = CustomerFactory.createWithAddress(
  data.name, 
  new Address(
    data.address.street,
    data.address.number,
    data.address.zip,
    data.address.city,
  )
);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test list customer usecase", () => { 
  it("should list customers", async () => {
    const customerRepository = MockRepository();
    const listCustomerUsecase = new ListCustomerUsecase(customerRepository);
    const input: ListCustomerInputDTO = {};
    const output = await listCustomerUsecase.execute(input);

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});