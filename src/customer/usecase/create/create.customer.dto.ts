export interface CreateCustomerInputDTO {
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}

export interface CreateCustomerOutputDTO {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
