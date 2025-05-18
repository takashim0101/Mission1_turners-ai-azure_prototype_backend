import express from 'express';
import { loadVehicles, loadExtendedVehicles, saveVehicles } from './localStorage.js';

const router = express.Router();

// List of known brand names
const knownSedanBrands = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Mazda", "Volkswagen", "Subaru", "Hyundai", "Kia", "Acura"];
const knownSUVBrands = ["INFINITI", "Porsche", "Buick", "Cadillac", "Toyota", "GMC", "Subaru", "Nissan", "Jeep", "Lexus", "BMW", "Ford", "Chevrolet", "Volkswagen", "Mazda", "Hyundai", "Mercedes-Benz"];
const knownTruckBrands = ["Ford", "Chevrolet", "Nissan", "GMC", "Toyota"];

// // Helper function
// const isBrand = (tag, knownBrands) => knownBrands.includes(tag);
// -------------------- GET ENDPOINTS --------------------

// Get sedan data
router.get('/sedans', (req, res) => {
    try {
        const sedans = loadVehicles('sedans'); // Load sedan data
        res.json(sedans); // Return data including image_url
    } catch (error) {
        console.error(`Error loading sedans: ${error.message}`);
        return res.status(500).json({ error: `Failed to load sedans data: ${error.message}` });
    }
});

// Get SUV data
router.get('/suvs', (req, res) => {
    try {
        const suvs = loadVehicles('suvs'); // Load SUV data
        res.json(suvs); // Return data including image_url
    } catch (error) {
        console.error(`Error loading suvs: ${error.message}`);
        return res.status(500).json({ error: `Failed to load suvs data: ${error.message}` });
    }
});

// Get truck data
router.get('/trucks', (req, res) => {
    try {
        const trucks = loadVehicles('trucks'); // Load truck data
        res.json(trucks); // Return data including image_url
    } catch (error) {
        console.error(`Error loading trucks: ${error.message}`);
        return res.status(500).json({ error: `Failed to load trucks data: ${error.message}` });
    }
});

// Get extended sedan data
router.get('/extended/sedans', (req, res) => {
    try {
        console.time("loadExtendedVehicles"); // Start timing
        const extendedSedans = loadExtendedVehicles('sedans'); // Load extended sedan data
        console.timeEnd("loadExtendedVehicles"); // End timing
        res.json(extendedSedans); // Return data including image_url
    } catch (error) {
        console.error(`Error loading extended sedans: ${error.message}`);
        return res.status(500).json({ error: `Failed to load extended sedans data: ${error.message}` });
    }
});

// Get extended SUV data
router.get('/extended/suvs', (req, res) => {
    try {
        console.time("loadExtendedVehicles"); // Start timing
        const extendedSuvs = loadExtendedVehicles('suvs'); // Load extended SUV data
        console.timeEnd("loadExtendedVehicles"); // End timing
        res.json(extendedSuvs); // Return data including image_url
    } catch (error) {
        console.error(`Error loading extended suvs: ${error.message}`);
        return res.status(500).json({ error: `Failed to load extended suvs data: ${error.message}` });
    }
});

// Get extended truck data
router.get('/extended/trucks', (req, res) => {
    try {
        console.time("loadExtendedVehicles"); // Start timing
        const extendedTrucks = loadExtendedVehicles('trucks'); // Load extended truck data
        console.timeEnd("loadExtendedVehicles"); // End timing
        res.json(extendedTrucks); // Return data including image_url
    } catch (error) {
        console.error(`Error loading extended trucks: ${error.message}`);
        return res.status(500).json({ error: `Failed to load extended trucks data: ${error.message}` });
    }
});


// -------------------- POST ENDPOINTS --------------------

// Add sedan data
router.post('/sedans', (req, res) => {
    try {
        const sedans = loadVehicles('sedans'); // Load current sedan data
        const newSedan = req.body; // Get new sedan data

        // Generate image_url
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/';
        newSedan.image_url = BASE_URL + newSedan.image.replace(/\\/g, '/').replace('classified_images/', '');
        
        sedans.push(newSedan); // Add new data
        saveVehicles('sedans', sedans); // Save the updated sedan data
        res.status(201).json(newSedan); // Return the newly created sedan data including image_url
    } catch (error) {
        console.error(`Error saving sedans: ${error.message}`);
        return res.status(500).json({ error: `Failed to save sedans data: ${error.message}` });
    }
});

// Add SUV data
router.post('/suvs', (req, res) => {
    try {
        const suvs = loadVehicles('suvs'); // Load current SUV data
        const newSuv = req.body; // Get new SUV data

        // Generate image_url
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/';
        newSuv.image_url = BASE_URL + newSuv.image.replace(/\\/g, '/').replace('classified_images/', '');
        
        suvs.push(newSuv); // Add new data
        saveVehicles('suvs', suvs); // Save the updated SUV data
        res.status(201).json(newSuv); // Return the newly created SUV data including image_url
    } catch (error) {
        console.error(`Error saving suvs: ${error.message}`);
        return res.status(500).json({ error: `Failed to save suvs data: ${error.message}` });
    }
});

// Add truck data
router.post('/trucks', (req, res) => {
    try {
        const trucks = loadVehicles('trucks'); // Load current truck data
        const newTruck = req.body; // Get new truck data

        // Generate image_url
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/';
        newTruck.image_url = BASE_URL + newTruck.image.replace(/\\/g, '/').replace('classified_images/', '');
        
        trucks.push(newTruck); // Add new data
        saveVehicles('trucks', trucks); // Save the updated truck data
        res.status(201).json(newTruck); // Return the newly created truck data including image_url
    } catch (error) {
        console.error(`Error saving trucks: ${error.message}`);
        return res.status(500).json({ error: `Failed to save trucks data: ${error.message}` });
    }
});

// Add extended sedan data
router.post('/extended/sedans', (req, res) => {
    try {
        const sedans = loadExtendedVehicles('sedans'); // Load current extended sedan data
        const newSedan = req.body[0]; // Get new sedan data (assuming it's an array)

        // Generate image_url
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/';
        newSedan.image_url = BASE_URL + newSedan.image.replace(/\\/g, '/').replace('classified_images/', '');
        
        sedans.push(newSedan); // Add new data
        saveVehicles('sedans', sedans); // Save the updated sedan data
        res.status(201).json(newSedan); // Return the newly created sedan data including image_url
    } catch (error) {
        console.error(`Error saving extended sedans: ${error.message}`);
        return res.status(500).json({ error: `Failed to save extended sedans data: ${error.message}` });
    }
});

// Add extended SUV data
router.post('/extended/suvs', (req, res) => {
    try {
        const suvs = loadExtendedVehicles('suvs'); // Load current extended SUV data
        const newSuv = req.body[0]; // Get new SUV data (assuming it's an array)

        // Generate image_url
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/';
        newSuv.image_url = BASE_URL + newSuv.image.replace(/\\/g, '/').replace('classified_images/', '');
        
        suvs.push(newSuv); // Add new data
        saveVehicles('suvs', suvs); // Save the updated SUV data
        res.status(201).json(newSuv); // Return the newly created SUV data including image_url
    } catch (error) {
        console.error(`Error saving extended suvs: ${error.message}`);
        return res.status(500).json({ error: `Failed to save extended suvs data: ${error.message}` });
    }
});

// Add extended truck data
router.post('/extended/trucks', (req, res) => {
    try {
        const trucks = loadExtendedVehicles('trucks'); // Load current extended truck data
        const newTruck = req.body[0]; // Get new truck data (assuming it's an array)

        // Generate image_url
        const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/';
        newTruck.image_url = BASE_URL + newTruck.image.replace(/\\/g, '/').replace('classified_images/', '');
        
        trucks.push(newTruck); // Add new data
        saveVehicles('trucks', trucks); // Save the updated truck data
        res.status(201).json(newTruck); // Return the newly created truck data including image_url
    } catch (error) {
        console.error(`Error saving extended trucks: ${error.message}`);
        return res.status(500).json({ error: `Failed to save extended trucks data: ${error.message}` });
    }
});

export default router;

