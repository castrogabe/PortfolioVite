// routes/designContentRoutes.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';
import DesignContent from '../models/designContentModel.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { isAuth, isAdmin } from '../utils.js';

const designContentRouter = express.Router();

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const uploadDir = isProduction
  ? '/var/data/uploads'
  : path.join(__dirname, '../uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.chmodSync(uploadDir, 0o777);
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// GET /api/designcontent - Fetch design content
designContentRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const content = await DesignContent.findOne({});
    res.json(content);
  })
);

// PUT /api/designcontent/image - Upload an image for a section
designContentRouter.put(
  '/image',
  isAuth,
  isAdmin,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({
      image: { url: imageUrl, name: req.file.filename },
    });
  })
);

// DELETE /api/designcontent/image - Delete a specific image from the file system
designContentRouter.delete(
  '/image',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { imageName } = req.body;
    if (!imageName) {
      return res.status(400).json({ message: 'Image name is required' });
    }
    const imagePath = path.join(uploadDir, imageName);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  })
);

// PUT /api/designcontent/jumbotron - Upload jumbotron image
designContentRouter.put(
  '/jumbotron',
  isAuth,
  isAdmin,
  upload.single('jumbotronImage'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    let content = await DesignContent.findOne({});
    if (!content) {
      content = new DesignContent({
        sections: [],
        jumbotronImage: { url: imageUrl, name: req.file.originalname },
      });
    } else {
      // Delete old jumbotron image if it exists
      if (content.jumbotronImage && content.jumbotronImage.name) {
        const oldImagePath = path.join(uploadDir, content.jumbotronImage.name);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      content.jumbotronImage = { url: imageUrl, name: req.file.filename };
    }
    await content.save();
    res.json({ jumbotronImage: content.jumbotronImage });
  })
);

// DELETE /api/designcontent/jumbotron - Remove jumbotron image
designContentRouter.delete(
  '/jumbotron',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const content = await DesignContent.findOne({});
    if (content) {
      if (content.jumbotronImage && content.jumbotronImage.name) {
        const imagePath = path.join(uploadDir, content.jumbotronImage.name);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      content.jumbotronImage = null;
      await content.save();
      res.json({ message: 'Jumbotron image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Design content not found' });
    }
  })
);

// PUT /api/designcontent - Replace sections
designContentRouter.put(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req, res) => {
    const { sections } = req.body;
    const content = await DesignContent.findOneAndUpdate(
      {},
      { sections },
      { new: true, upsert: true }
    );
    res.json(content);
  })
);

// PUT /api/designcontent/section/:sectionIndex - Update specific section

designContentRouter.put(
  '/section/:sectionIndex',

  isAuth,

  isAdmin,

  asyncHandler(async (req, res) => {
    const { sectionIndex } = req.params;

    const updatedSection = req.body.section;

    const content = await DesignContent.findOne({});

    const index = parseInt(sectionIndex, 10);

    if (
      content &&
      Array.isArray(content.sections) &&
      index >= 0 &&
      index < content.sections.length
    ) {
      if (!updatedSection.images) {
        updatedSection.images = [];
      }

      content.sections[index] = updatedSection;

      await content.save();

      res.json({ message: 'Section updated successfully' });
    } else {
      res.status(404).json({ message: 'Section not found' });
    }
  })
);

export default designContentRouter;
