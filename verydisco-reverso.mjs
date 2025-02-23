#!/usr/bin/env node
import { readFile } from 'fs/promises';
// Function to reverse the "very disco" effect on a word
function reverseVeryDisco(word) {
  const midpoint = Math.floor(word.length / 2);
  return word.slice(midpoint) + word.slice(0, midpoint);
}
// Get the file name from command line argument
const fileName = process.argv[2];
if (!fileName) {
  console.error('Please provide a file name as an argument');
  process.exit(1);
}
async function decipherFile() {
  try {
    // Read the file content
    const content = await readFile(fileName, 'utf-8');
    // Split the content into words, reverse each word, then join them back
    const decipheredContent = content
      .trim()
      .split(' ')
      .map(reverseVeryDisco)
      .join(' ');
    // Print the result to the console
    console.log(decipheredContent);
  } catch (error) {
    console.error('Error reading or processing the file:', error.message);
  }
}
decipherFile();