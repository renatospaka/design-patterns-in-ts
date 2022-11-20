import CustomerFactory from "../../domain/factory/customer.factory";
import Address from "../../domain/valueobject/address";
import UpdateCustomerUsecase from "./update.customer.usercase";

const start = {
  name: "John",
  address: {
    street: "Street",
    city: "City",
    number: 123,
    zip: "Zip",
  },
};
const customer = CustomerFactory.createWithAddress(
  start.name, 
  new Address(
    start.address.street,
    start.address.number,
    start.address.zip,
    start.address.city,
  )
);

const input = {
  id: customer.id,
  name: "Ugly John",
  address: {
    street: "Nowhere St",
    city: "Out City",
    number: 321,
    zip: "Fake Zip",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test update customer usecase", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomer = new UpdateCustomerUsecase(customerRepository);

    const output =  await updateCustomer.execute(input);
    expect(output).toEqual(input)
  });
});
