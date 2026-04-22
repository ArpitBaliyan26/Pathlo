const fs = require('fs');

const feesAndPlacements = {
  'BITS Pilani': { fees: '24 Lakhs', package: '20 LPA' },
  'VIT Vellore': { fees: '16 Lakhs', package: '8.5 LPA' },
  'Manipal Institute of Technology': { fees: '18 Lakhs', package: '10 LPA' },
  'SRM Institute of Science and Technology': { fees: '15 Lakhs', package: '7.5 LPA' },
  'Thapar Institute of Engineering and Technology': { fees: '19 Lakhs', package: '11 LPA' },
  'Ashoka University': { fees: '38 Lakhs', package: '10.5 LPA' },
  'Krea University': { fees: '30 Lakhs', package: '8 LPA' },
  'Flame University': { fees: '32 Lakhs', package: '7.5 LPA' },
  'O.P. Jindal Global University': { fees: '35 Lakhs', package: '9 LPA' },
  'Plaksha University': { fees: '32 Lakhs', package: '16 LPA' },
  'Scaler School of Technology': { fees: '15 Lakhs', package: '21 LPA' },
  'Newton School of Technology': { fees: '14 Lakhs', package: '15 LPA' },
  "St. Stephen's College": { fees: '1.5 Lakhs', package: '8 LPA' },
  'Hindu College': { fees: '0.8 Lakhs', package: '8.5 LPA' },
  'SRCC': { fees: '1 Lakh', package: '10 LPA' },
  'LSR': { fees: '1 Lakh', package: '7.5 LPA' },
  'Christ University': { fees: '8 Lakhs', package: '6.5 LPA' },
  'NMIMS': { fees: '20 Lakhs', package: '12 LPA' },
  'Symbiosis (Pune)': { fees: '18 Lakhs', package: '10.5 LPA' },
  'TISS Mumbai': { fees: '2.5 Lakhs', package: '15 LPA' },
  'IIM Ahmedabad': { fees: '25 Lakhs', package: '33 LPA' },
  'IIM Bangalore': { fees: '24 Lakhs', package: '33 LPA' },
  'IIM Calcutta': { fees: '27 Lakhs', package: '34 LPA' },
  'ISB Hyderabad': { fees: '40 Lakhs', package: '34 LPA' },
  "Masters' Union": { fees: '28 Lakhs', package: '33 LPA' },
  'BIT Mesra': { fees: '14 Lakhs', package: '11.5 LPA' },
  'RV College of Engineering': { fees: '10 Lakhs', package: '10 LPA' },
  'BMS College of Engineering': { fees: '9 Lakhs', package: '8.5 LPA' },
  'PES University': { fees: '14 Lakhs', package: '10 LPA' },
  'Shiv Nadar University': { fees: '18 Lakhs', package: '9 LPA' },
  'Amity University': { fees: '15 Lakhs', package: '5.5 LPA' }
};

let content = fs.readFileSync('./src/data/colleges.js', 'utf8');

for (const [name, data] of Object.entries(feesAndPlacements)) {
  const safeName = name.replace(/[']/g, "\\'");
  const regexFees = new RegExp(\`name:\\s*['"]\\b\${safeName}\\b['"][\\\\s\\\\S]*?annualFees:\\s*['"]['"]\`, 'g');
  content = content.replace(regexFees, match => match.replace(/annualFees:\s*['"]['"]/, \`annualFees: '\${data.fees}'\`));
  
  const regexPackage = new RegExp(\`name:\\s*['"]\\b\${safeName}\\b['"][\\\\s\\\\S]*?avgPackage:\\s*['"]['"]\`, 'g');
  content = content.replace(regexPackage, match => match.replace(/avgPackage:\s*['"]['"]/, \`avgPackage: '\${data.package}'\`));
}

content = content.replace(/annualFees:\s*['"]['"]/g, \"annualFees: 'Varies by program'\");
content = content.replace(/avgPackage:\s*['"]['"]/g, \"avgPackage: 'Data being updated'\");

fs.writeFileSync('./src/data/colleges.js', content, 'utf8');
console.log('Patched colleges.js with correct placement and fees data.');
