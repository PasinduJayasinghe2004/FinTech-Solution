const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);

const replacePattern1 = /<div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center shadow-lg shadow-teal-500\/25">\s*<span className="text-white font-display font-black text-xl leading-none">T<\/span>\s*<\/div>/g;
const replaceWith1 = '<img src="/logo.jpg" alt="TuitionPay Logo" className="w-10 h-10 rounded-2xl object-cover shadow-lg shadow-teal-500/25" />';

const replacePattern2 = /<div className="w-10 h-10 rounded-xl bg-teal-400 flex items-center justify-center shadow-lg shadow-teal-500\/30 group-hover:scale-105 transition-transform">\s*<span className="text-blue-950 font-display font-extrabold text-xl leading-none">T<\/span>\s*<\/div>/g;
const replaceWith2 = '<img src="/logo.jpg" alt="TuitionPay Logo" className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform" />';

const replacePattern3 = /<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center shadow-md">\s*<span className="text-white font-display font-bold text-sm leading-none">T<\/span>\s*<\/div>/g;
const replaceWith3 = '<img src="/logo.jpg" alt="TuitionPay Logo" className="w-8 h-8 rounded-xl object-cover shadow-md" />';

const replacePattern4 = /<div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center shadow-md">\s*<span className="text-white font-display font-bold text-sm">T<\/span>\s*<\/div>/g;
const replaceWith4 = '<img src="/logo.jpg" alt="TuitionPay Logo" className="w-8 h-8 rounded-xl object-cover shadow-md" />';

const replacePattern5 = /<div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-400 via-teal-400 to-blue-600 flex items-center justify-center shadow-md">\s*<span className="text-white text-xs font-bold">T<\/span>\s*<\/div>/g;
const replaceWith5 = '<img src="/logo.jpg" alt="TuitionPay Logo" className="w-6 h-6 rounded-lg object-cover shadow-md" />';

let modifiedFiles = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    content = content.replace(replacePattern1, replaceWith1);
    content = content.replace(replacePattern2, replaceWith2);
    content = content.replace(replacePattern3, replaceWith3);
    content = content.replace(replacePattern4, replaceWith4);
    content = content.replace(replacePattern5, replaceWith5);
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedFiles++;
        console.log(`Updated logo in ${file}`);
    }
});

console.log(`Modified ${modifiedFiles} files.`);
