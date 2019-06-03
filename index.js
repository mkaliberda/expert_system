//let stdin = process.openStdin();

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

let data = {
  'input': [],
  'vars': [],
  'output': [],
};

let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
});

lineReader.on('line', (line) => {
  if (line == '') { return; }
  if(line[0] == '=') { 
    for(let i = 1; i < line.length; i++){
      data.vars.push(line[i]);
    };
    return;
   }
  if(line[0] == '?'){
    for(let i = 1; i < line.length; i++){
      data.output.push(line[i]);
    };
    return;
  }
  data.input.push(line);
});
