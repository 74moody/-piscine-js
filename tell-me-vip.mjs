#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
async function getVIPs(dirPath) {
  try {
    // Read the directory
    const files = await readdir(dirPath);
    // Read all files and parse guest information
    const guestsPromises = files.map(async (file) => {
      const filePath = join(dirPath, file);
      const content = await readFile(filePath, 'utf-8');
      const guestData = JSON.parse(content);
      const [firstname, lastname] = file.slice(0, -5).split('_');
      return { firstname, lastname, answer: guestData.answer.toLowerCase() };
    });
    // Wait for all files to be read
    const guests = await Promise.all(guestsPromises);
    // Filter VIP guests (those who answered 'yes')
    const vipGuests = guests.filter(guest => guest.answer === 'yes');
    // Sort VIP guests alphabetically by lastname, then firstname
    vipGuests.sort((a, b) => {
      if (a.lastname !== b.lastname) {
        return a.lastname.localeCompare(b.lastname);
      }
      return a.firstname.localeCompare(b.firstname);
    });
    // Format VIP list
    const vipList = vipGuests.map((guest, index) => 
      `${index + 1}. ${guest.lastname} ${guest.firstname}`
    ).join('\n');
    // Write VIP list to vip.txt file
    await writeFile('vip.txt', vipList);
    // Read and return the content of vip.txt
    const vipContent = await readFile('vip.txt', 'utf-8');
    return vipContent;
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
// Call the function and print the result
getVIPs(dirPath).then(console.log);