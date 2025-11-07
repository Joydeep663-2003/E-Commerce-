const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');
const UploadCtrl = require('../controllers/uploadCtrl'); 

// SET STORAGE ENGINE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// INIT UPLOAD
const upload = multer({ storage });

router.post('/upload', auth, upload.single('image'), UploadCtrl.uploadImage);

module.exports = router;
