const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoint to handle form submission and write data to a file
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email, comments } = req.body;

        // Create a string with the form data
        const formDataString = `Name: ${name}\nEmail: ${email}\nComments: ${comments}\n`;

        // Write data to a local file (example: data.txt)
        fs.appendFileSync('data.txt', formDataString);

        // Send success response
        res.status(200).json({ message: 'Form data written to file successfully' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Failed to submit form' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
