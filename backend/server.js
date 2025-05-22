const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Truy cập ảnh tĩnh

// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'qlydongho1'
});
db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// Cấu hình multer lưu ảnh vào thư mục uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
    /*  */
  }
});
const upload = multer({ storage });


// ✅ API Thêm sản phẩm (có upload ảnh)
// app.post('/product/add', upload.single('image'), (req, res) => {
  app.post('/product/add', upload.single('image'), (req, res) => {
  const { name, email } = req.body;
  const image = req.file ? req.file.path : null;


/* lưu ý  code upload image filename */
    console.log('Uploaded image filename:', image);
  const sql = 'INSERT INTO cuahangonline (name, email, image) VALUES (?, ?, ?)';




  db.query(sql, [name, email, image], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Thêm sản phẩm thành công', id: result.insertId });
  });
});


// ✅ API Cập nhật sản phẩm (sửa tên, email, ảnh mới)
app.put('/product/update/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, email,oldImage } = req.body;

  const image = req.file ? req.file.path : null;
  //  const image = req.file ? req.file.filename : oldImage;




/*  */


   /*  */
  // Lấy ảnh cũ để xóa file
  db.query('SELECT image FROM cuahangonline WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Không tìm thấy sản phẩm' });

    const oldImage = results[0].image;

    // Update dữ liệu
    const sql = image ? 'UPDATE cuahangonline SET name = ?, email = ?, image = ? WHERE id = ?' : 'UPDATE cuahangonline SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, image, id], (err, result) => {
      console.log(result)
      if (err) return res.status(500).send(err);

      // Xóa file ảnh cũ
      if (oldImage && image) {
        fs.unlink(path.join(__dirname, 'uploads', oldImage), (err) => {
          if (err) console.error('Lỗi xóa ảnh cũ:', err);
        });
      }

      res.send({ message: 'Cập nhật sản phẩm thành công' });
    });
  });
});


// ✅ API Xóa sản phẩm (xóa ảnh luôn)
app.delete('/product/delete/:id', (req, res) => {
  const { id } = req.params;

  // Lấy ảnh cũ để xóa file
  db.query('SELECT image FROM cuahangonline WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Không tìm thấy sản phẩm' });

    const oldImage = results[0].image;

    // Xóa dữ liệu trong DB
    db.query('DELETE FROM cuahangonline WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).send(err);

      // Xóa file ảnh cũ
      if (oldImage) {
        fs.unlink(path.join(__dirname, 'uploads', oldImage), (err) => {
          if (err) console.error('Lỗi xóa ảnh:', err);
        });
      }

      res.send({ message: 'Xóa sản phẩm thành công' });
    });
  });
});


// ✅ API lấy danh sách sản phẩm
app.get('/product/gets', (req, res) => {
  db.query('SELECT * FROM cuahangonline ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});













/*  */




























app.listen(3002, () => {
  console.log('Server running on port 3002');
});
