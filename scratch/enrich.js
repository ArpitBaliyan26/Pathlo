import fs from 'fs';
import path from 'path';

const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY;

// Read colleges.js to extract college names and IDs
let content = fs.readFileSync('./src/data/colleges.js', 'utf8');

// Extract all objects with id and name
const regex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
const colleges = [];
let match;
while ((match = regex.exec(content)) !== null) {
  colleges.push({ id: match[1], name: match[2] });
}

console.log(\Found \ colleges.\);
// Just save the list for now so we can inspect
fs.writeFileSync('./scratch/colleges_list.json', JSON.stringify(colleges, null, 2));
