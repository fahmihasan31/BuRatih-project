const express = require("express");
const router = express.Router();
const db = require("./koneksi");

// end-point akses menampilkan data penyewa
router.get("/", (req, res) => {
  // create sql query
  let sql = "select * from penyewa";

  // run query
  db.query(sql, (error, result) => {
    let response = null;
    if (error) {
      response = {
        message: error.message, // pesan error
      };
    } else {
      response = {
        count: result.length, // jumlah data
        penyewa: result, // isi data
      };
    }
    res.json(response); // send response
  });
});

// end-point akses data penyewa berdasarkan nik_penyewa tertentu
router.get("/:nik_penyewa", (req, res) => {
  let data = {
    nik_penyewa: req.params.nik_penyewa,
  };
  // create sql query
  let sql = "select * from penyewa where ?";

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
        penyewa: result, // isi data
      };
    }
    res.json(response); // send response
  });
});

// end-point menyimpan data penyewa
router.post("/", (req, res) => {
  // prepare data
  let data = {
    nik_penyewa: req.body.nik_penyewa,
    nama_penyewa: req.body.nama,
    alamat_penyewa: req.body.alamat_penyewa,
    no_tlp: req.body.no_tlp,
    username: req.body.username,
    password: req.body.password,
  };

  // create sql query insert
  let sql = "insert into penyewa set ?";

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

// end-point mengubah data penyewa
router.put("/", (req, res) => {
  // prepare data
  let data = [
    // data
    {
      nik_penyewa: req.body.nik_penyewa,
      nama_penyewa: req.body.nama,
      alamat_penyewa: req.body.alamat_penyewa,
      no_tlp: req.body.no_tlp,
      username: req.body.username,
      password: req.body.password,
    },

    // parameter (primary key)
    {
      nik_penyewa: req.body.nik_penyewa,
    },
  ];

  // create sql query update
  let sql = "update penyewa set ? where ?";

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

// end-point menghapus data penyewa berdasarkan nik_penyewa
router.delete("/:nik_penyewa", (req, res) => {
  // prepare data
  let data = {
    nik_penyewa: req.params.nik_penyewa,
  };

  // create query sql delete
  let sql = "delete from penyewa where ?";

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
