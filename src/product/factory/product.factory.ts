import Product from "../domain/entity/product";
import ProductB from "../domain/entity/productB";
import ProductInterface from "../domain/entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
  public static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("product type not supported");
    }
  }
}
