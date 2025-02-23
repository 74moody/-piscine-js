#!/usr/bin/env node
import { readdir } from 'fs/promises';
import { resolve } from 'path';
async function countEntries(dirPath) {
  try {
    // Resolve the directory path
    const resolvedPath = resolve(dirPath);
    // Read the directory
    const entries = await readdir(resolvedPath);
    // Print only the number of entries
    console.log(entries.length);
  } catch (error) {
    console.error('Error reading directory:', error.message);
    process.exit(1);
  }
}
// Get the directory path from command line argument or use current directory
const dirPath = process.argv[2] || '.';
// Call the function
countEntries(dirPath);