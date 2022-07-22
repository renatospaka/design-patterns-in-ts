import Address from "./address";

describe("Address unit tests", () => {
  it("should throw error when street is empty", () => {
    expect(() => {
      const address = new Address("", 1, "12345-678", "Sampa")
    }).toThrowError("street is required");
  });

  it("should throw error when number is zero", () => {
    expect(() => {
      const address = new Address("Rua", 0, "12345-678", "Sampa")
    }).toThrowError("number is required");
  });

  it("should throw error when zip is empty", () => {
    expect(() => {
      const address = new Address("Rua", 1, "", "Sampa")
    }).toThrowError("ZIP is required");
  });

  it("should throw error when zip is empty", () => {
    expect(() => {
      const address = new Address("Rua", 1, "12345-678", "")
    }).toThrowError("city is required");
  });

  it("should show the address", () => {
    expect(() => {
      const address = new Address("Rua", 1, "12345-678", "Sampa");
      expect(address.toString()).toBe("Rua, 1, 12345-678 Sampa");
    });
  });

  it("should validate", () => {
    expect(() => {
      const address = new Address("Rua", 1, "12345-678", "Sampa");
      expect(address.validate()).not.toThrowError("street is required");
    });
  });
});
