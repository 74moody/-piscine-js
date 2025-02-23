#!/usr/bin/env node
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
const PORT = 5000;
const GUESTS_DIR = './guests';
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }
  const guestName = path.basename(req.url);
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', async () => {
    try {
      // Attempt to parse the JSON body
      let guestData;
      try {
        guestData = JSON.parse(body);
      } catch (parseError) {
        // If parsing fails, still return 201 but use the raw body
        guestData = body;
      }
      // Create or update the guest file
      const filePath = path.join(GUESTS_DIR, `${guestName}.json`);
      await fs.writeFile(filePath, typeof guestData === 'string' ? guestData : JSON.stringify(guestData, null, 2));
      // Always respond with 201 Created
      res.statusCode = 201;
      res.end(JSON.stringify(guestData));
    } catch (error) {
      console.error('Server error:', error);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'server failed' }));
    }
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});