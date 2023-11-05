const express = require("express");
const router = express.Router();
const db = require("./koneksi");

// end-point akses menampilkan data kendaraan
router.get("/", (req, res) => {
  let sql = "select * from kendaraan";

  //run query
  db.query(sql, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message, //pesan error
      };
    } else {
      response = {
        count: result.length, //jumlah data
        kendaraan: result, //isi data
      };
    }
    res.json(response); //mengirim response
  });
});

//endpoint akses data kendaraan dberdasarkan plat_nomor tertentu
router.get("/:id", (req, res) => {
  let data = {
    plat_nomor: req.params.id,
  };
  // create sql query
  let sql = "select * from kendaraan where ?";

  // run query
  db.query(sql, data, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message, // pesan error
      };
    } else {
      response = {
        count: result.length, // jumlah data
        kendaraan: result, // isi data
      };
    }
    res.json(response); // send response
  });
});

//endpoint menyimpan data kendaaraan
router.post("/", (req, res) => {
  let data = {
    plat_nomor: req.body.plat_nomor,
    merk_kendaraan: req.body.merk_kendaraan,
  };

  // create sql query insert
  let sql = "insert into kendaraan set ?";

  // run query
  db.query(sql, data, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      };
    } else {
      response = {
        message: result.affectedRows + " data inserted",
      };
    }
    res.json(response); // send response
  });
});

// end-point mengubah data kendaraan
router.put("/", (req, res) => {
  // prepare data
  let data = [
    // data
    {
      plat_nomor: req.body.plat_nomor,
      merk_kendaraan: req.body.merk_kendaraan,
    },

    // parameter (primary key)
    {
      plat_nomor: req.body.plat_nomor,
    },
  ];

  // create sql query update
  let sql = "update kendaraan set ? where ?";

  // run query
  db.query(sql, data, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      };
    } else {
      response = {
        message: result.affectedRows + " data updated",
      };
    }
    res.json(response); // send response
  });
});

// end-point menghapus data kendaraan berdasarkan plat_nomor
router.delete("/:plat_nomor", (req, res) => {
  // prepare data
  let data = {
    plat_nomor: req.params.plat_nomor,
  };

  // create query sql delete
  let sql = "delete from kendaraan where ?";

  // run query
  db.query(sql, data, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message,
      };
    } else {
      response = {
        message: result.affectedRows + " data deleted",
      };
    }
    res.json(response); // send response
  });
});

module.exports = router;
