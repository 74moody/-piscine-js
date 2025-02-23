#!/usr/bin/env node
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
const PORT = 5000;
const GUESTS_DIR = './guests';
const server = http.createServer(async (req, res) => {
  // Set response header to JSON
  res.setHeader('Content-Type', 'application/json');
  // Only handle GET requests
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }
  // Extract guest name from URL
  const guestName = path.basename(req.url);
  try {
    // Try to read the guest file
    const filePath = path.join(GUESTS_DIR, `${guestName}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    // If successful, return the content
    res.statusCode = 200;
    res.end(fileContent);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File not found
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'guest not found' }));
    } else {
      // Server error
      console.error('Server error:', error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'server failed' }));
    }
  }
});
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});