import express from 'express';
import axios from 'axios';

const router = express.Router();

// Image classification endpoint
router.post('/classify', async (req, res) => {
    const { imageUrl } = req.body; // Get image URL from request body

    try {
        const endpoint = `${process.env.AZURE_CUSTOM_VISION_ENDPOINT}/customvision/v3.0/Prediction/${process.env.AZURE_CUSTOM_VISION_PROJECT_ID}/classify/iterations/IterationName/image`; // Replace IterationName
        const response = await axios.post(endpoint, {
            url: imageUrl
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Prediction-Key': process.env.AZURE_CUSTOM_VISION_PREDICTION_KEY
            }
        });

        res.json(response.data); // Return classification results
    } catch (error) {
        console.error(`Error during classification: ${error.message}`);
        return res.status(500).json({ error: `Failed to classify image: ${error.message}` });
    }
});

export default router;
