import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import PortfolioContent from '../models/PortfolioContentModel.js';
import { isAuth, isAdmin } from '../utils.js';

const portfolioContentRouter = express.Router();

// GET /api/portfoliocontent - Fetch the single document
portfolioContentRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    // Find one document (it will be created on the first PUT request)
    const content = await PortfolioContent.findOne({});

    if (content) {
      res.send(content);
    } else {
      // If content doesn't exist yet, return a default empty structure
      res.send({ paragraphs: [], link: '', linkText: '' });
    }
  })
);

// PUT /api/portfoliocontent - Update or create the document (Admin only)
portfolioContentRouter.put(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { paragraphs, link, linkText } = req.body;

    // Use findOneAndUpdate with { upsert: true } to create the document if it doesn't exist
    const updatedContent = await PortfolioContent.findOneAndUpdate(
      {}, // Search criteria: find the one and only document
      {
        $set: {
          paragraphs: paragraphs,
          link: link,
          linkText: linkText,
        },
      },
      { new: true, upsert: true } // Return the new document, create if not found
    );

    res.send({
      message: 'Portfolio content updated successfully',
      content: updatedContent,
    });
  })
);

export default portfolioContentRouter;
