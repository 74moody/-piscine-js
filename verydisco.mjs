// Get the first argument passed after the program name
const firstArg = process.argv[2];

// Split the argument into words (space-separated)
const words = firstArg.split(' ');

// Function to split a word in half (rounded up) and swap the halves
function discofy(word) {
    const mid = Math.ceil(word.length / 2); // Round up
    const firstHalf = word.slice(0, mid);
    const secondHalf = word.slice(mid);
    return secondHalf + firstHalf; // Re-compose in the other order
}

// Process each word and swap halves
const discoWords = words.map(discofy);

// Join the disco-fied words back into a sentence and log the result
console.log(discoWords.join(' '));
