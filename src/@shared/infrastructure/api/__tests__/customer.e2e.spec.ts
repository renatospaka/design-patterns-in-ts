import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John",
        address: {
          street: "Main Av",
          city: "Strange City",
          number: 321,
          zip: "12345A",
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Main Av");
    expect(response.body.address.city).toBe("Strange City");
    expect(response.body.address.number).toBe(321);
    expect(response.body.address.zip).toBe("12345A");
  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({ name: "John" }
    );

    expect(response.status).toBe(500);
  });
});
