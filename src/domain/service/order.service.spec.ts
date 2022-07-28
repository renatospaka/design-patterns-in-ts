import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("i1", "Item 1", 100, "product 1", 1);
    const orderItem2 = new OrderItem("i2", "Item 2", 200, "product 2", 2);
    const order1 = new Order("Order 1", "Customer 100", [orderItem1]);
    const order2 = new Order("Order 2", "Customer 200", [orderItem2]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(500);
  });
});
