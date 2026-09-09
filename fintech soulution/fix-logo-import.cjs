const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else if (fullPath.endsWith('.tsx')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk(srcDir);
let modifiedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('src="/logo.jpg"')) {
        // Replace src string with variable
        content = content.replace(/src="\/logo\.jpg"/g, 'src={logoImg}');
        
        // Add import at the top
        if (!content.includes('import logoImg from')) {
            content = `import logoImg from '@/assets/logo.jpg';\n` + content;
        }
        
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated image import in ${file}`);
    }
});

console.log(`Modified ${modifiedFiles} files.`);
