const mysql = require("mysql");
//mengkoneksikan ke database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "penyewaan_kendaraan",
});

//statement jika tidak terkoneksi atau terkoneksi
db.connect((error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("berhasil terkoneksi ke db penyewaan_kendaraan");
  }
});

module.exports = db;
