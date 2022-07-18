import Address from "./address";

export default class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this._active = false;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate customer");      
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  validate() {
    this._active = false
    if (this._name.length === 0) {
      throw new Error("Name is required");      
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  Address(address: Address) {
    this._address = address;
  }
}