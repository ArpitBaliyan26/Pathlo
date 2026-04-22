import fs from 'fs';

let content = fs.readFileSync('./src/data/colleges.js', 'utf8');

const regex = /id:\s*'([^']+)',\s*name:\s*'([^']+)'/g;
const colleges = [];
let match;
while ((match = regex.exec(content)) !== null) {
  colleges.push({ id: match[1], name: match[2] });
}

fs.writeFileSync('./scratch/colleges_list.json', JSON.stringify(colleges, null, 2));
console.log("Dumped " + colleges.length + " colleges.");
