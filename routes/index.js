const { Router } = require("express");
const { save } = require("../save_json");
let favouriteNumber = require("../number.json");
const add = require("../add");

const router = new Router();

router.get("/sum/:number1/:number2", (req, res) => {
  const {number1, number2} = req.params;
  if(number1 == null || number2 == null) {
    res.status(400).send("Not provided numbers");
    return;
  }
  if(isNaN(parseInt(number1)) || isNaN(parseInt(number2))) {
    res.status(400).send("Numbers needs to be integer");
    return;
  }
  const result = add(favouriteNumber.favouriteNumber, add(parseInt(number1), parseInt(number2)));
  res.json({
    status: "success",
    result: result,
  }); 
});

router.post("/favNumber", (req, res) => {
  const {number} = req.body;
  if(number == null ) {
    res.status(400).send("Not provided number");
    return;
  } 
  if(isNaN(parseInt(number))) {
    res.status(400).send("The number needs to be integer");
    return;
  }
  favouriteNumber.favouriteNumber = number;
  save(favouriteNumber);
  res.json({
    status: "success",
    newFavouriteNumber: number,
  });
});

router.delete("/favNumber", (req, res) => {
  favouriteNumber.favouriteNumber = 0; 
  save(favouriteNumber);
  res.json({
    status: "success"
  });
});

module.exports = router;