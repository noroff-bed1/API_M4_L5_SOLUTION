const express = require("express"); 
const serverRoutes = require("../routes/index"); 
const request = require("supertest"); 
const app = express(); 
const { save } = require("../save_json");
const bodyParser = require("body-parser");

jest.mock("../number.json", () => ({
  "favouriteNumber": 0
}));

jest.mock("../save_json", () => ({
  save: jest.fn(),
}));

app.use(bodyParser.json()); 
app.use("/", serverRoutes); 

describe("testing-server-routes", () => {
  test("POST /favNumber - success", async () => {
    let numberObj = {
      number: -1
    }
    const { body } = await request(app).post("/favNumber").send(numberObj);
    expect(body).toEqual({
      status: "success",
      newFavouriteNumber: -1
    });
    expect(save).toHaveBeenCalledWith({
      favouriteNumber: -1
    });
  });

  test("GET /sum/1/2 - success", async () => {
    const { body } = await request(app).get("/sum/1/2"); 
    expect(body).toEqual({
      "status": "success",
      "result": 2
     });
  });

  test("DELETE /favNumber - success", async () => {
    const {body}  = await request(app).delete("/favNumber");
    expect(body).toEqual({
      status: "success"
    });
    expect(save).toHaveBeenCalledWith({
      favouriteNumber: 0
    });
  });

  test("GET /sum/1/2 - success", async () => {
    const { body } = await request(app).get("/sum/1/2"); 
    expect(body).toEqual({
      "status": "success",
      "result": 3
     });
  });
});
