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
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "1", [item1]);
    let total = order.total();
    expect(total).toBe(200);

    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order2 = new Order("o2", "2", [item1, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should be active", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
    const order = new Order("o1", "1", [item1]);
    expect(order.isActive()).toBe(true);
  });

  it("should throw error when quantity is less or equal zero", () => { 
    expect(() => {
      const item1 = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const order = new Order("o1", "1", [item1]);
    }).toThrowError("quantity must be greater than zero");
  });
});
