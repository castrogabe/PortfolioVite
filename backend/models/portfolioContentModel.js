import mongoose from 'mongoose';

const portfolioContentSchema = new mongoose.Schema({
  // Use a simple array of paragraphs for the main text block
  paragraphs: [{ type: String, required: true }],

  // Link and Text for the primary Call-to-Action button (e.g., "Contact for Quote")
  link: { type: String },
  linkText: { type: String },
});

const PortfolioContent = mongoose.model(
  'PortfolioContent',
  portfolioContentSchema
);

export default PortfolioContent;
