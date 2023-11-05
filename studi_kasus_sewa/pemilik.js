const express = require("express");
const router = express.Router();
const db = require("./koneksi");

// end-point akses menampilkan data pemilik
router.get("/", (req, res) => {
  // create sql query
  let sql = "select * from pemilik";

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
        pemilik: result, // isi data
      };
    }
    res.json(response); // send response
  });
});

// end-point akses data siswa berdasarkan nik_pemilik tertentu
router.get("/:id", (req, res) => {
  let data = {
    nik_pemilik: req.params.id,
  };
  // create sql query
  let sql = "select * from pemilik where ?";

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
        pemilik: result, // isi data
      };
    }
    res.json(response); // send response
  });
});

// end-point menyimpan data pemilik
router.post("/", (req, res) => {
  // prepare data
  let data = {
    nik_pemilik: req.body.nik_pemilik,
    nama: req.body.nama,
    username: req.body.username,
    password: req.body.password,
  };

  // create sql query insert
  let sql = "insert into pemilik set ?";

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

// end-point mengubah data pemilik
router.put("/", (req, res) => {
  // prepare data
  let data = [
    // data
    {
      nik_pemilik: req.body.nik_pemilik,
      nama: req.body.nama,
      username: req.body.username,
      password: req.body.password,
    },

    // parameter (primary key)
    {
      nik_pemilik: req.body.nik_pemilik,
    },
  ];

  // create sql query update
  let sql = "update pemilik set ? where ?";

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

// end-point menghapus data pemilik berdasarkan nik_pemilik
router.delete("/:nik_pemilik", (req, res) => {
  // prepare data
  let data = {
    nik_pemilik: req.params.nik_pemilik,
  };

  // create query sql delete
  let sql = "delete from pemilik where ?";

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
