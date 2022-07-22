export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;
  private _active: boolean = false;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    this._active = false;
    if (this._id.length === 0) {
      throw new Error("id is required");
    }

    if (this._name.length === 0) {
      throw new Error("name is required");
    }

    if (this._price === 0) {
      throw new Error("price is required");
    }

    if (this._price < 0) {
      throw new Error("price must be greater than zero");
    }

    this._active = true;
  }

  get name(): string {
    return this._name;
  }

  isActive(): boolean {
    return this._active;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price;
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }
}