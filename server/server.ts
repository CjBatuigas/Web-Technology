// src/server.ts
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import apiRouter from './routes/index'
import connectDB from './config/database'
import { applySecurity } from "./middleware/security";

const app = express();
// Apply security middleware
applySecurity(app);

const allowedOrigins = [
  'http://localhost:5173',
  'https://web-technology-cyho.vercel.app',
  'https://web-technology-cyho-ekiuj72uh-cjbatuigas-projects.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: true
}));

// To secure the connection of the database
dotenv.config();
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Mount all API routes under /api
console.log("por", process.env.PORT);
app.use('/aims', apiRouter);

// for local run (not serverless Vercel)
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

export default app;