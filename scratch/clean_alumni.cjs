const fs = require('fs');
let data = fs.readFileSync('src/data/enrichedData.js', 'utf8');
data = data.replace(/alumni:\s*\[\{name:\s*"[^"]*(Network|Base|Leaders)[^"]*".*?\}\]/g, 'alumni: []');
fs.writeFileSync('src/data/enrichedData.js', data);
console.log('Fixed alumni');
