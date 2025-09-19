// backend/routes/websiteRoutes.js (ESM)
import express from 'express';
import Website from '../models/websiteModel.js';
import { isAuth, isAdmin } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const websiteRouter = express.Router();

websiteRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const websites = await Website.find();
    res.send(websites);
  })
);

websiteRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newWebsite = new Website({
      name: String(Date.now()),
      slug: String(Date.now()),
      image: '/images/',
      language: 'MERN Stack',
      languageDescription: 'MongoDB, Express, React, Node.js',
      description: 'description',
      link: 'https://www.domain.com',
    });
    const website = await newWebsite.save();
    res.send({ message: 'Website Created', website });
  })
);

websiteRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).send({ message: 'Website Not Found' });

    website.name = req.body.name;
    website.slug = req.body.slug;
    website.image = req.body.image;
    website.language = req.body.language;
    website.languageDescription = req.body.languageDescription;
    website.description = req.body.description;
    website.link = req.body.link;

    await website.save();
    res.send({ message: 'Website Updated' });
  })
);

websiteRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).send({ message: 'Website Not Found' });

    await website.deleteOne(); // modern replacement for remove()
    res.send({ message: 'Website Deleted' });
  })
);

const PAGE_SIZE = 10;

websiteRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || PAGE_SIZE;

    const websites = await Website.find()
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countWebsites = await Website.countDocuments();

    res.send({
      websites,
      totalWebsites: countWebsites,
      page,
      pages: Math.ceil(countWebsites / pageSize),
    });
  })
);

// GET /api/websites/search?q=react&page=1&pageSize=10
websiteRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const pageSize = Math.max(parseInt(req.query.pageSize || '10', 10), 1);
    const q = (req.query.q || '').trim();

    // Simple regex-based keyword filter over a few fields
    const regex = q ? new RegExp(q, 'i') : null;
    const filter = q
      ? { $or: [{ name: regex }, { description: regex }, { language: regex }] }
      : {};

    const countWebsites = await Website.countDocuments(filter);
    const pages = Math.max(Math.ceil(countWebsites / pageSize), 1);
    const skip = (page - 1) * pageSize;

    const websites = await Website.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize);

    res.json({ websites, page, pages, countWebsites });
  })
);

websiteRouter.get(
  '/slug/:slug',
  expressAsyncHandler(async (req, res) => {
    const website = await Website.findOne({ slug: req.params.slug });
    if (!website) return res.status(404).send({ message: 'Website Not Found' });
    res.send(website);
  })
);

websiteRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const website = await Website.findById(req.params.id);
    if (!website) return res.status(404).send({ message: 'Website Not Found' });
    res.send(website);
  })
);

export default websiteRouter;
