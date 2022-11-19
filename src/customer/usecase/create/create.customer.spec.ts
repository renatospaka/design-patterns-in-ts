import CreateCustomerUsecase from "./create.customer.usecase";

const input = {
  name: "John",
  address: {
    street: "Street",
    city: "City",
    number: 123,
    zip: "Zip",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create customer usecase", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const createCustomerUsecase = new CreateCustomerUsecase(customerRepository);

    const output = await createCustomerUsecase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
      },
    });
  });
});
