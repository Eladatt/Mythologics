const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const serveIndex = require('serve-index');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve index listings for the 'txt' directory
app.use('/txt', serveIndex('txt', { 'icons': true }));
app.use('/txt', express.static('txt'));

// Endpoint to list .txt files
app.get('/list-txt-files', async (req, res) => {
  try {
    const files = await fs.readdir('txt');
    const txtFiles = files.filter(file => path.extname(file).toLowerCase() === '.txt');
    res.json(txtFiles);
  } catch (error) {
    res.status(500).json({ error: 'Unable to list files' });
  }
});

// Endpoint to serve a specific .txt file
app.get('/txt-files/:filename', async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'txt', filename);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    res.send(content);
  } catch (error) {
    res.status(404).send('File not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
