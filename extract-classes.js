const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'index.html');
const outputFilePath = path.join(__dirname, 'used-classes.txt');

fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
  if (err) {
    console.error('Error reading the HTML file:', err);
    return;
  }

  const classRegex = /class="([^"]*)"/g;
  let match;
  const usedClasses = new Set();

  while ((match = classRegex.exec(htmlContent)) !== null) {
    match[1].split(' ').forEach(className => {
      if (className) usedClasses.add(className);
    });
  }

  fs.writeFile(outputFilePath, Array.from(usedClasses).join('\n'), err => {
    if (err) {
      console.error('Error when writing the issuing file:', err);
    } else {
      console.log('The list of classes used was successfully created.');
    }
  });
});
