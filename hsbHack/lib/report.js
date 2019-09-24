const fs = require('fs');
const opener = require('opener')

const template = diffs => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Diff report</title>
    <style>
      .img-container {
        display: flex;
        width: 100%;
      }
      .img-container img {
        width: 33%;
      }
    </style>
  </head>
  <body>
    <h1>Diff report</h1>
    <h2>Test run: ${new Date().toLocaleDateString()}</h2>
    ${diffs.map(diff => `
    <h3>${diff.filename.split('.')[0]}</h3>
    <h4>${diff.filename.split('.')[2]}</h4>
    <div class="img-container">
      <img src="./hsbHack/baseline/${diff.filename}"/>
      <img src="./hsbHack/current/${diff.filename}"/>
      <img src="./hsbHack/diff/${diff.filename}"/>
    </div>
    `).join('')}
   
  </body>
</html>
`
module.exports = (diffs) =>{
    const report = template(diffs)
    const filename = "./hsbHack-report.html"
    fs.writeFile(filename, report, function(err) {

      if(err) {
          return console.log(err);
      }
      opener(filename)
      console.log("The file was saved!");
  });
  return diffs.reduce((str,diff)=>`${str}
  ${diff.filename}\t has a diff of ${diff.faultyPixels}pixels`,'') 
}
