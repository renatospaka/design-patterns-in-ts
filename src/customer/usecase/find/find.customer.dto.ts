export interface FindCustomerInputDTO {
  id: string;
}

export interface FindCustomerOutputDTO {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  }
}
