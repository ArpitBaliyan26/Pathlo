const fs = require('fs');
let details = fs.readFileSync('src/data/collegeDetails.js', 'utf8');
details = details.replace(/\{\s*name:\s*'(Young Alumni Network|Emerging Network)',[^}]+\},?/g, '');
fs.writeFileSync('src/data/collegeDetails.js', details);

let enriched = fs.readFileSync('src/data/enrichedData.js', 'utf8');
enriched = enriched.replace(/\{\s*name:\s*\"(Strong Industry Alumni|Strong regional network|Strong Management Network|Growing Alumni Network|Young Alumni Network|Emerging Network|Emerging Design Network|Massive Alumni Base|Large Professional Network|Growing Network|Top Tech Network)\"[^}]+\},?/g, '');
fs.writeFileSync('src/data/enrichedData.js', enriched);
console.log('Cleaned files');
