import express, { Request, Response } from "express";
import CreateCustomerUsecase from "../../../usecase/create/create.customer.usecase";
import CustomerRepository from "../../repository/customer.repository";

export const customerRoute = express.Router();
customerRoute.post("/", async (req: Request, res: Response) => {
  const createCustomerUsecase = new CreateCustomerUsecase(new CustomerRepository());
  try {
    const input = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip,
      },
    };

    const output = await createCustomerUsecase.execute(input);
    res.send(output);
  } catch (e) {
    res.status(500).send(e);
  }
});
