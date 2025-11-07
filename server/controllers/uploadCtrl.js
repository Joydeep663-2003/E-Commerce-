const path = require('path');
const fs = require('fs');

const UploadCtrl = {
  uploadImage: (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ msg: "No file uploaded." });

      const filePath = `/uploads/${req.file.filename}`;
      return res.json({ url: filePath });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = UploadCtrl;
