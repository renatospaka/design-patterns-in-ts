import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("address is mandatory to activate customer");      
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    this._active = false
    if (this._id.length === 0) {
      throw new Error("id is required");
    }
    if (this._name.length === 0) {
      throw new Error("name is required");      
    }
  }

  Address(address: Address) {
    this._address = address;
  }
}