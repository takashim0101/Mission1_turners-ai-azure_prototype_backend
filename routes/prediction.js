import express from 'express';
import axios from 'axios';

const router = express.Router();

// Object detection endpoint
router.post('/detect', async (req, res) => {
    const { imageUrl } = req.body; // Get image URL from request body
    console.log(`Received request to detect objects in image: ${imageUrl}`); // Log incoming request

    try {
        const endpoint = `${process.env.AZURE_CUSTOM_VISION_ENDPOINT}/customvision/v3.0/Prediction/${process.env.AZURE_CUSTOM_VISION_PROJECT_ID}/detect/iterations/IterationName/image`; // Replace IterationName
        const response = await axios.post(endpoint, {
            url: imageUrl
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Prediction-Key': process.env.AZURE_CUSTOM_VISION_PREDICTION_KEY
            }
        });

        console.log(`Response from Azure: ${JSON.stringify(response.data)}`); // Log response
        res.json(response.data); // Return prediction results
    } catch (error) {
        console.error(`Error during prediction: ${error.message}`); // Log error message
        return res.status(500).json({ error: `Failed to detect objects: ${error.message}` });
    }
});

export default router;

