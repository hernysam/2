const express = require('express');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const app = express();
const mediaFolder = path.join(__dirname, 'videos');

// Endpoint to get a random media file
app.get('/get-random-media', (req, res) => {
    fs.readdir(mediaFolder, (err, files) => {
        if (err) return res.status(500).json({ error: 'Error reading media folder' });

        const randomFile = files[Math.floor(Math.random() * files.length)];
        const filePath = path.join(mediaFolder, randomFile);
        const fileType = mime.getType(filePath);

        res.json({
            src: `/videos/${randomFile}`,
            type: fileType.startsWith('video') ? 'video' : 'image'
        });
    });
});

// Serve static media files
app.use('/videos', express.static(mediaFolder));

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
