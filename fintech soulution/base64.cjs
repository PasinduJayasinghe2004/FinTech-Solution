const fs = require('fs');
const img = fs.readFileSync('src/assets/logo.jpg');
const base64 = img.toString('base64');
fs.writeFileSync('src/assets/logo.ts', `export const logoImg = 'data:image/jpeg;base64,${base64}';\n`);
