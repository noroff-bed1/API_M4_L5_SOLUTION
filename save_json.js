const fs = require("fs");
const path = require("path");

const save = (favNumber) => {
  console.log("saving");
  fs.writeFile(
    path.join(__dirname, ".", "number.json"),
    JSON.stringify(favNumber, null, 2),
    (error) => {
      if (error) {
        throw error;
      }
    }
  );
};

module.exports = { save };