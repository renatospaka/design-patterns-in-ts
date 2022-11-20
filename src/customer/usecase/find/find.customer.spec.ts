import Customer from "../../domain/entity/customer";
import Address from "../../domain/valueobject/address";
import CustomerRepository from "../../infrastrucutre/repository/customer.repository";
import FindCustomerUsecase from "./find.customer.usecase";

const customer = new Customer("123", "John");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find customer usecase", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const findCustomer = new FindCustomerUsecase(customerRepository);

    const input = {
      id: "123",
    };
    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };
    const result = await findCustomer.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");      
    });
    const findCustomer = new FindCustomerUsecase(customerRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return findCustomer.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
