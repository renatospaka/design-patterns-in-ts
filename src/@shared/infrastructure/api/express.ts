import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { customerRoute } from "../../../customer/infrastrucutre/api/routes/customer.route";
import CustomerModel from "../../../customer/infrastrucutre/db/sequelize/model/customer.model";

export const app: Express = express();
app.use(express.json());
app.use("/customers", customerRoute);

export let sequelize: Sequelize;
async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}
setupDb();
