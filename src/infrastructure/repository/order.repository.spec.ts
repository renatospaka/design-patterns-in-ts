import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("o123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne(
      {
        where: { id: order.id },
        include: ["items"],
      }
    );

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: order.id
        }
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("o123", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    orderItem.changeQuantity(2);
    await orderRepository.update(order);

    const updatedOrderModel = await OrderModel.findOne(
      {
        where: { id: order.id },
        include: ["items"],
      }
    );
    console.log(updatedOrderModel.id, updatedOrderModel.items[0].quantity, updatedOrderModel.items[0].price)

    expect(updatedOrderModel.toJSON()).toStrictEqual({      
      id: order.id,
      customer_id: customer.id,
      total: 40,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: 4,
          product_id: orderItem.productId,
          order_id: order.id
        }
      ],
    });
  });

  // it("should find an order", async () => {
  //   const customerRepository = new CustomerRepository();
  //   const customer = new Customer("123", "Customer 1");
  //   const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  //   customer.changeAddress(address);
  //   await customerRepository.create(customer);

  //   const productRepository = new ProductRepository();
  //   const product = new Product("123", "Product 1", 10);
  //   await productRepository.create(product);

  //   const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
  //   const order = new Order("o123", customer.id, [orderItem]);

  //   const orderRepository = new OrderRepository();
  //   await orderRepository.create(order);

  //   const orderModel = await OrderModel.findOne(
  //     {
  //       where: { id: order.id },
  //       include: ["items"],
  //     }
  //   );

    // const foundOrder = await orderRepository.find(order.id);
    
    // expect(orderModel.toJSON()).toStrictEqual({      
    //   id: foundOrder.id,
    //   customer_id: foundOrder.id,
    //   total: foundOrder.total(),
    //   items: [
    //     {
    //       id: foundOrder.items[0].id,
    //       name: foundOrder.items[0].name,
    //       price: foundOrder.items[0].price,
    //       quantity: foundOrder.items[0].quantity,
    //       product_id: foundOrder.items[0].productId,
    //       order_id: foundOrder.items[0].id
    //     }
    //   ],
    // });
  // });
});
