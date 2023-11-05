//inisialisasi libraryx
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./koneksi");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pemilik = require("./pemilik");
const penyewa = require("./penyewa");
const kendaraan = require("./kendaraan");

app.use("/pemilik", pemilik);
app.use("/penyewa", penyewa);
app.use("/kendaraan", kendaraan);

app.listen(8000, () => {
  console.log("Run on port 8000");
});
