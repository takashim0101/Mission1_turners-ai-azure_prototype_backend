import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: 'classified_images/' }); // Destination for uploaded files

// Image upload endpoint
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

export default router;
