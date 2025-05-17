import express from 'express';
import { loadVehicles, saveVehicles } from './localStorage.js'; // Import from localStorage

const router = express.Router();

// Get sedan data
router.get('/sedans', (req, res) => {
    try {
        const sedans = loadVehicles('sedans'); // Load sedan data
        res.json(sedans); // Return data including image_url
    } catch (error) {
        console.error(`Error loading sedans: ${error.message}`); // Specific error log
        return res.status(500).json({ error: `Failed to load sedans data: ${error.message}` });
    }
});

// Get SUV data
router.get('/suvs', (req, res) => {
    try {
        const suvs = loadVehicles('suvs'); // Load SUV data
        res.json(suvs); // Return data including image_url
    } catch (error) {
        console.error(`Error loading suvs: ${error.message}`); // Specific error log
        return res.status(500).json({ error: `Failed to load suvs data: ${error.message}` });
    }
});

// Get truck data
router.get('/trucks', (req, res) => {
    try {
        const trucks = loadVehicles('trucks'); // Load truck data
        res.json(trucks); // Return data including image_url
    } catch (error) {
        console.error(`Error loading trucks: ${error.message}`); // Specific error log
        return res.status(500).json({ error: `Failed to load trucks data: ${error.message}` });
    }
});

// Add sedan data
router.post('/sedans', (req, res) => {
    try {
        const sedans = loadVehicles('sedans'); // Load current sedan data
        const newSedan = req.body; // Get new sedan data
        sedans.push(newSedan); // Add new data
        saveVehicles('sedans', sedans); // Save data
        res.status(201).json(newSedan); // Success response
    } catch (error) {
        console.error(`Error saving sedans: ${error.message}`); // Specific error log
        return res.status(500).json({ error: `Failed to save sedans data: ${error.message}` });
    }
});

// Add SUV data
router.post('/suvs', (req, res) => {
    try {
        const suvs = loadVehicles('suvs'); // Load current SUV data
        const newSuv = req.body; // Get new SUV data
        suvs.push(newSuv); // Add new data
        saveVehicles('suvs', suvs); // Save data
        res.status(201).json(newSuv); // Success response
    } catch (error) {
        console.error(`Error saving suvs: ${error.message}`); // Specific error log
        return res.status(500).json({ error: `Failed to save suvs data: ${error.message}` });
    }
});

export default router;









