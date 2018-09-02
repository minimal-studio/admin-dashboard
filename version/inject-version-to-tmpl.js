const fs = require('fs');
const glob = require('glob');

const version = fs.readFileSync('public/js/version.txt', 'utf8').trim();
const replace = /\[__VERSION__\]/g;

function addVersion(filepath) {
  const result = fs.readFileSync(filepath, 'utf8');
  const newfile = filepath.replace(/\.template/, '');
  fs.writeFileSync(newfile, result.replace(replace, version));
  console.log(newfile);
}

glob('public/**/*.template.ejs', (err, files) => {
  if (err) throw new Error(err);
  files.forEach(addVersion);
})
