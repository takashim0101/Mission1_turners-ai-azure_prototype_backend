// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// 
// dotenv.config(); // Load environment variables
// 
// const DATA_PATH = process.env.DATA_PATH || './data'; // Default path
// const DATA_PATH2 = process.env.DATA_PATH2 || './data2'; // Path for extended data
// const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/images/'; // Base URL for images
// 
// // Helper function to load vehicle data from local JSON files
// //Loads vehicle data from a specified JSON file.
// const loadVehicles = (vehicleType) => {
//     //Checks for file existence and reads the content.
//     const filePath = path.join(DATA_PATH, `trimmed_minimal_50_id_${vehicleType}.json`);
//     console.log(`Loading vehicle data from: ${filePath}`); // Debug log
//     try {
//         if (!fs.existsSync(filePath)) {
//             throw new Error(`File not found: ${filePath}`);
//         }
//         //Parses the JSON data and updates image URLs.
//         const data = fs.readFileSync(filePath, 'utf-8');
//         if (!data) {
//             throw new Error('File is empty');
//         }
//         let vehicles;
//         try {
//             vehicles = JSON.parse(data); // Handle JSON parsing
//         } catch (parseError) {
//             throw new Error(`Error parsing JSON data: ${parseError.message}`);
//         }
//         
//         // Update image URLs
//         vehicles.forEach(vehicle => {
//             vehicle.image_url = BASE_URL + vehicle.image.replace(/\\/g, '/').replace('classified_images/', '');
//         });
// 
//         return vehicles;
//     } catch (error) {
//         console.error(`Error loading ${vehicleType} vehicles: ${error.message}`);
//         throw new Error(`Error loading ${vehicleType} vehicles from local file: ${error.message}`);
//     }
// };
// 
// // Helper function to load extended vehicle data from local JSON files
// const loadExtendedVehicles = (vehicleType) => {
//     const filePath = path.join(DATA_PATH2, `trimmed_extended_50_id_${vehicleType}.json`);
//     console.log(`Loading extended vehicle data from: ${filePath}`); // Debug log
//     try {
//         if (!fs.existsSync(filePath)) {
//             throw new Error(`File not found: ${filePath}`);
//         }
//         const data = fs.readFileSync(filePath, 'utf-8');
//         if (!data) {
//             throw new Error('File is empty');
//         }
//         let vehicles;
//         try {
//             vehicles = JSON.parse(data); // Handle JSON parsing
//         } catch (parseError) {
//             throw new Error(`Error parsing JSON data: ${parseError.message}`);
//         }
// 
//         // Update image URLs
//         vehicles.forEach(vehicle => {
//             vehicle.image_url = BASE_URL + vehicle.image.replace(/\\/g, '/').replace('classified_images/', '');
//         });
// 
//         return vehicles;
//     } catch (error) {
//         console.error(`Error loading extended ${vehicleType} vehicles: ${error.message}`);
//         throw new Error(`Error loading extended ${vehicleType} vehicles from local file: ${error.message}`);
//     }
// };
// 
// // Helper function to save vehicle data to local JSON files
// const saveVehicles = (vehicleType, vehicles) => {
//     const filePath = path.join(DATA_PATH2, `trimmed_extended_50_id_${vehicleType}.json`); // Use DATA_PATH2
//     const data = JSON.stringify(vehicles, null, 2);
// 
//     try {
//         fs.writeFileSync(filePath, data);
//         console.log(`Vehicles saved successfully to ${filePath}.`);
//     } catch (error) {
//         console.error(`Error saving ${vehicleType} vehicles: ${error.message}`);
//         throw new Error(`Error saving ${vehicleType} vehicles to local file: ${error.message}`);
//     }
// };
// 
// // Export functions
// export { loadVehicles, loadExtendedVehicles, saveVehicles };


import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const DATA_PATH = process.env.DATA_PATH || './data'; // Default path for standard data
const DATA_PATH2 = process.env.DATA_PATH2 || './data2'; // Path for extended data
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/classified_images/'; // Base URL for images

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
        let vehicles;
        try {
            vehicles = JSON.parse(data); // Handle JSON parsing
        } catch (parseError) {
            throw new Error(`Error parsing JSON data: ${parseError.message}`);
        }
        
        // Update image URLs
        vehicles.forEach(vehicle => {
            vehicle.image_url = BASE_URL + vehicle.image.replace(/\\/g, '/').replace('classified_images/', '');
        });

        return vehicles;
    } catch (error) {
        console.error(`Error loading ${vehicleType} vehicles: ${error.message}`);
        throw new Error(`Error loading ${vehicleType} vehicles from local file: ${error.message}`);
    }
};

// Helper function to load extended vehicle data from local JSON files
const loadExtendedVehicles = (vehicleType) => {
    const filePath = path.join(DATA_PATH2, `trimmed_extended_50_id_${vehicleType}.json`);
    console.log(`Loading extended vehicle data from: ${filePath}`); // Debug log
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }
        const data = fs.readFileSync(filePath, 'utf-8');
        if (!data) {
            throw new Error('File is empty');
        }
        let vehicles;
        try {
            vehicles = JSON.parse(data); // Handle JSON parsing
        } catch (parseError) {
            throw new Error(`Error parsing JSON data: ${parseError.message}`);
        }

        // Update image URLs
        vehicles.forEach(vehicle => {
            vehicle.image_url = BASE_URL + vehicle.image.replace(/\\/g, '/').replace('classified_images/', '');
        });

        return vehicles;
    } catch (error) {
        console.error(`Error loading extended ${vehicleType} vehicles: ${error.message}`);
        throw new Error(`Error loading extended ${vehicleType} vehicles from local file: ${error.message}`);
    }
};

// Helper function to save standard vehicle data to local JSON files
const saveVehicles = (vehicleType, vehicles) => {
    const filePath = path.join(DATA_PATH, `trimmed_minimal_50_id_${vehicleType}.json`); // Use DATA_PATH for standard data
    const data = JSON.stringify(vehicles, null, 2);

    try {
        fs.writeFileSync(filePath, data);
        console.log(`Vehicles saved successfully to ${filePath}.`);
    } catch (error) {
        console.error(`Error saving ${vehicleType} vehicles: ${error.message}`);
        throw new Error(`Error saving ${vehicleType} vehicles to local file: ${error.message}`);
    }
};

// Helper function to save extended vehicle data to local JSON files
const saveExtendedVehicles = (vehicleType, vehicles) => {
    const filePath = path.join(DATA_PATH2, `trimmed_extended_50_id_${vehicleType}.json`); // Use DATA_PATH2 for extended data
    const data = JSON.stringify(vehicles, null, 2);

    try {
        fs.writeFileSync(filePath, data);
        console.log(`Extended vehicles saved successfully to ${filePath}.`);
    } catch (error) {
        console.error(`Error saving extended ${vehicleType} vehicles: ${error.message}`);
        throw new Error(`Error saving extended ${vehicleType} vehicles to local file: ${error.message}`);
    }
};

// Export functions
export { loadVehicles, loadExtendedVehicles, saveVehicles, saveExtendedVehicles };













