import Address from "../domain/valueobject/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Main St", 123, "12345A", "ThisTown" );
    let customer = CustomerFactory.createWithAddress("John", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);
    expect(customer.Address.street).toBe("Main St");
    expect(customer.Address.city).toBe("ThisTown");
    expect(customer.Address.number).toBe(123);
    expect(customer.Address.zip).toBe("12345A");
  });
});
