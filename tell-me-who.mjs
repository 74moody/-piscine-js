#!/usr/bin/env node
import { readdir } from 'fs/promises';
import { join } from 'path';
async function getGuests(dirPath) {
  try {
    // Read the directory
    const files = await readdir(dirPath);
    // Parse guest information from file names
    const guests = files
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const [firstname, lastname] = file.slice(0, -5).split('_');
        return { firstname, lastname };
      });
    // Sort guests alphabetically by lastname, then firstname
    guests.sort((a, b) => {
      if (a.lastname !== b.lastname) {
        return a.lastname.localeCompare(b.lastname);
      }
      return a.firstname.localeCompare(b.firstname);
    });
    // Format and print guest list
    guests.forEach((guest, index) => {
      console.log(`${index + 1}. ${guest.lastname} ${guest.firstname}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}
// Get the directory path from command line argument
const dirPath = process.argv[2];
if (!dirPath) {
  console.error('Please provide a directory path');
  process.exit(1);
}
// Call the function
getGuests(dirPath);