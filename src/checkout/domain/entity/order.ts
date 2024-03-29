import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;
  private _active: boolean = false;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  validate() {
    this._active = false;
    if (this._id.length === 0) {
      throw new Error("id is required");
    }

    if (this._customerId.length === 0) {
      throw new Error("customer id is required");
    }

    if (this._items.length === 0) {
      throw new Error("order items list cannot be empty");
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error("quantity must be greater than zero");
    }

    this._active = true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  isActive(): boolean {
    return this._active;
  }
}
