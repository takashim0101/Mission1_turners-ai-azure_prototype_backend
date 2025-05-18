import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles.js';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRouter from './routes/upload.js';
import predictionRouter from './routes/prediction.js';
import classificationRouter from './routes/classification.js';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware settings
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// CORS settings
app.use(cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
}));

// Serve static files using the path from the .env file
const classifiedImagesPath = process.env.CLASSIFIED_IMAGES_PATH || path.join(__dirname, 'classified_images');
// Serve static files for classified images
app.use('/classified_images', express.static(path.join(__dirname, 'classified_images')));

// Set up the router
app.use('/api/vehicles', vehiclesRouter); // Mount vehiclesRouter
app.use('/api/upload', uploadRouter); // Upload router
app.use('/api/predictions', predictionRouter); // Mount prediction router
app.use('/api/classifications', classificationRouter); // Classification router

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});





























