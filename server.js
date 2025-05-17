import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import vehiclesRouter from './routes/vehicles.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// CORS settings
app.use(cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
}));

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'classified_images'))); // Serve images

// JSON body parser middleware
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Set up the router
app.use('/api/vehicles', vehiclesRouter); // Mount vehiclesRouter

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


























