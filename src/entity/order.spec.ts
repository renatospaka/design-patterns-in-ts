import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("id is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrowError("customer id is required");
  });

  it("should throw error when order items is empty", () => {
    expect(() => {
      let order = new Order("1", "123", []);
    }).toThrowError("order items list cannot be empty");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("i1", "Item 1", 100);
    const order = new Order("o1", "1", [item1]);
    let total = order.total();
    expect(total).toBe(100);

    const item2 = new OrderItem("i2", "Item 2", 200);
    const order2 = new Order("o2", "2", [item1, item2]);
    total = order2.total();
    expect(total).toBe(300);

  });
});
