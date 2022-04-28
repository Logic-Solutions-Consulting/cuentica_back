const XLSX = require("xlsx"); ///https://www.npmjs.com/package/xlsx

//extraer datos del excel, crear un objeto y devolverlo en un return
const parseData = () => {
  console.log("parsing data...");
};

//hacer un post request y devolver success y mensaje
const sendData = async () => {
  console.log("sending data...");
  const success = getRandomSuccess();

  return {
    success,
    message: success ? "Todo enviado" : "Ha ocurrido un error",
  };
};

///funcion test, eliminar cuando todo este ok
const getRandomSuccess = () => Math.random() > 0.5;

module.exports = {
  parseData,
  sendData,
};
