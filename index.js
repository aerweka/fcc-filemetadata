var express = require("express");
var cors = require("cors");
const multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const multerCfg = upload.single("upfile");
app.post("/api/fileanalyse", multerCfg, function (req, res) {
  const { originalname, mimetype, size } = req.file;

  return res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
