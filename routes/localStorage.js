import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const DATA_PATH = process.env.DATA_PATH || './data'; // Set default path
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/'; // Set base URL for images

// Helper function to load vehicle data from local JSON files
const loadVehicles = (vehicleType) => {
    const filePath = path.join(DATA_PATH, `trimmed_minimal_50_id_${vehicleType}.json`);
    console.log(`Loading vehicle data from: ${filePath}`); // Debug log
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        if (!data) {
            throw new Error('File is empty');
        }
        const vehicles = JSON.parse(data);
        
        // Update image URLs
        vehicles.forEach(vehicle => {
            vehicle.image_url = BASE_URL + vehicle.image.replace(/\\/g, '/'); // Fix Windows path separators
        });

        return vehicles;
    } catch (error) {
        console.error(`Error loading ${vehicleType} vehicles: ${error.message}`);
        throw new Error(`Error loading ${vehicleType} vehicles from local file: ${error.message}`);
    }
};

// Helper function to save vehicle data to local JSON files
const saveVehicles = (vehicleType, vehicles) => {
    const filePath = path.join(DATA_PATH, `trimmed_minimal_50_id_${vehicleType}.json`);
    const data = JSON.stringify(vehicles, null, 2);

    try {
        fs.writeFileSync(filePath, data);
        console.log(`Vehicles saved successfully to ${vehicleType} local file.`);
    } catch (error) {
        throw new Error(`Error saving ${vehicleType} vehicles to local file: ${error.message}`);
    }
};

export { loadVehicles, saveVehicles };






