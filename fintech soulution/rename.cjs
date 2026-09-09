const fs = require('fs');
const path = require('path');

const dirsToSearch = ['src', 'vite.config.ts', 'package.json', 'index.html', 'server', 'docker-compose.yml', 'TuitionPay_Development_Guide.md'];
const rootDir = path.join(__dirname);

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return [dir];
    }
    
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

let modifiedFiles = 0;

dirsToSearch.forEach(dir => {
    const fullDir = path.join(rootDir, dir);
    const files = walk(fullDir);
    
    files.forEach(file => {
        // Skip some files
        if (file.includes('node_modules') || file.includes('.git') || file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.svg') || file.endsWith('.cjs') || (file.endsWith('.ts') && file.includes('assets\\logo.ts')) || file.includes('package-lock.json')) {
            return;
        }
        
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        
        content = content.replace(/TuitionPay/g, 'RIA');
        content = content.replace(/tuitionpay/g, 'ria');
        content = content.replace(/Tuitionpay/g, 'Ria');
        
        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            modifiedFiles++;
            console.log(`Updated name in ${file}`);
        }
    });
});

console.log(`Modified ${modifiedFiles} files.`);
