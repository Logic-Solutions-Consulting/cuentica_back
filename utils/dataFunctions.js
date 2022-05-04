const XLSX = require("xlsx"); ///https://www.npmjs.com/package/xlsx
const formidable = require("formidable");
const path = require("path");

const uploadFolder = path.join(__dirname, "public", "files");

const getExcelFile = async (req) => {
  const form = formidable({
    uploadDir: uploadFolder,
  });
  const reqExcelFile = await parseRequestExcelFile(req, form);
  const test = parseData(reqExcelFile);
};

const parseRequestExcelFile = async (req, form) =>
  await form.parse(req, (err, fields, files) => {
    if (err) return console.log("Error parsing file");
    return files.example1;
  });

//extraer datos del excel, crear un objeto y devolverlo en un return
const parseData = async (file) => {
  console.log(file.options);
  return;
  if (!file.length) {
    //Single file

    // checks if the file is valid
    const isValid = isFileValid(file);
    console.log("name is: ");
    console.log(file);

    return;

    // creates a valid name by removing spaces
    const fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));

    if (!isValid) {
      // throes error if file isn't valid
      return console.log("The file type is not a valid type");
    }
    try {
      // renames the file in the directory
      fs.renameSync(file.path, join(uploadFolder, fileName));
    } catch (error) {
      console.log(error);
    }

    try {
      // stores the fileName in the database
      const newFile = await File.create({
        name: `files/${fileName}`,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  } else {
    // Multiple files
  }
};

const isFileValid = (file) => {
  const type = file.type.split("/").pop();
  const validTypes = ["jpg", "jpeg", "png", "pdf", "xlsx"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
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
  getExcelFile,
};
