const app = require("express");
const { parseData, sendData } = require("../utils/dataFunctions");

const route = app.Router();

route.post("/new", async (req, res) => {
  const parsedData = parseData();
  const response = await sendData(parsedData);

  const { success, message } = response;

  success
    ? res.status("200").send({ message })
    : res.status("400").send({ message });
});

module.exports = route;
