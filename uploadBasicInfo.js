import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import { loadVehicles } from './routes/localStorage.js'; // Import loadVehicles

dotenv.config();

const JSON_FILES = [
    `${process.env.DATA_PATH}/trimmed_minimal_50_id_sedans.json`,
    `${process.env.DATA_PATH}/trimmed_minimal_50_id_suvs.json`,
    `${process.env.DATA_PATH}/trimmed_minimal_50_id_trucks.json`
];

const endpoint = `${process.env.AZURE_CUSTOM_VISION_ENDPOINT}/customvision/v3.0/Training/projects/${process.env.AZURE_CUSTOM_VISION_PROJECT_ID}/images/uploads`;

const loadJsonFile = (filePath) => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

const uploadImage = async (imageUrl, tag) => {
    const imageData = fs.readFileSync(imageUrl);
    const response = await axios.post(endpoint, imageData, {
        headers: {
            'Content-Type': 'application/octet-stream',
            'Training-Key': process.env.AZURE_CUSTOM_VISION_TRAINING_KEY,
        },
        params: {
            tag_ids: tag,
        },
    });
    return response.data;
};

const main = async () => {
    for (const filePath of JSON_FILES) {
        const vehicles = loadJsonFile(filePath);
        for (const vehicle of vehicles) {
            try {
                const imageUrl = vehicle.image; // Ensure the correct property is used
                const tag = vehicle.tags[0]; // Use the first tag for simplicity
                await uploadImage(imageUrl, tag);
                console.log(`Uploaded ${imageUrl} with tag ${tag}`);
            } catch (error) {
                console.error(`Error uploading ${vehicle.image}: ${error.message}`);
            }
        }
    }
};

main();

