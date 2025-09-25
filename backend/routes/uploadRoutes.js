// backend/routes/uploadRoutes.js (ESM)
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { isAdmin, isAuth } from '../utils.js';

const uploadRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only!'));
  }
}

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// POST /api/upload/single - Upload a single image
uploadRouter.post(
  '/single',
  isAuth,
  isAdmin,
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.send({
      message: 'Image uploaded successfully',
      image: { url: imageUrl, name: req.file.filename },
    });
  }
);

// DELETE /api/upload/image - Delete an image by filename
uploadRouter.delete('/image', isAuth, isAdmin, (req, res) => {
  const { imageName } = req.body;
  if (!imageName) {
    return res.status(400).send('Image name not provided.');
  }

  const imagePath = path.join(uploadDir, imageName);

  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
    res.send({ message: 'Image deleted successfully' });
  } else {
    res.status(404).send('Image not found.');
  }
});

export default uploadRouter;
