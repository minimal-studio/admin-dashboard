const fs = require('fs')
const glob = require('glob')
const path = require('path')

const version = fs.readFileSync(path.resolve(__dirname, '../public/js/version.txt'), 'utf8').trim()
const replace = /\[__VERSION__\]/g

function addVersion(filepath, path) {
  const result = fs.readFileSync(filepath, 'utf8')
  const newfile = filepath.replace(/\/template\//, path).replace(/template\./, '')
  let writeRes = fs.writeFileSync(newfile, result.replace(replace, version))
}

const ejsTMPLUrl = path.resolve(__dirname, '../template/*.ejs');
const writeFloder = '/public/html/';
glob(ejsTMPLUrl, (err, files) => {
  if (err) throw new Error(err)
  files.forEach((file) => {
    addVersion(file, writeFloder)
  })
})
