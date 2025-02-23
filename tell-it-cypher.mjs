#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';
async function encodeDecodeFile(inputFile, operation, outputFile) {
  try {
    // Read the input file
    const data = await readFile(inputFile);
    let result;
    if (operation === 'encode') {
      // Convert to base64
      result = Buffer.from(data).toString('base64');
      outputFile = outputFile || 'cypher.txt';
    } else if (operation === 'decode') {
      // Convert from base64
      result = Buffer.from(data.toString(), 'base64').toString('utf-8');
      outputFile = outputFile || 'clear.txt';
    } else {
      throw new Error('Invalid operation. Use "encode" or "decode".');
    }
    // Write the result to the output file
    await writeFile(outputFile, result);
    console.log(`Operation complete. Result saved in ${outputFile}`);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}
// Get command line arguments
const [inputFile, operation, outputFile] = process.argv.slice(2);
if (!inputFile || !operation) {
  console.error('Please provide an input file and an operation (encode/decode)');
  process.exit(1);
}
// Call the function
encodeDecodeFile(inputFile, operation, outputFile);