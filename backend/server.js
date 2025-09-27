// server.js (ESM)
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'node:path';
import seedRouter from './routes/seedRoutes.js';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import summaryRouter from './routes/summaryRoutes.js';
import websiteRouter from './routes/websiteRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';
import homeContentRouter from './routes/homeContentRoutes.js';
import fs from 'node:fs';
import aboutContentRouter from './routes/aboutContentRoutes.js';
import designContentRouter from './routes/designContentRoutes.js'; // added

dotenv.config();

// __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to db'))
  .catch((err) => console.error('Mongo error:', err.message));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

// routes
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/seed', seedRouter);
app.use('/api/summary', summaryRouter);
app.use('/api/websites', websiteRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/homecontent', homeContentRouter);
app.use('/api/aboutcontent', aboutContentRouter);
app.use('/api/designcontent', designContentRouter);

/**
 * Static files:
 * - In dev (Vite), DO NOT serve frontend here. Use Vite dev server + proxy.
 * - In prod, serve the built Vite app from ../frontend/dist
 */
if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
