type Product = {
  id: string;
  name: string;
  price: number;
};

export interface ListProductInputDTO {}

export interface ListProductOutputDTO {
  products: Product[];
}
