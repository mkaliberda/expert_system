//let stdin = process.openStdin();

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

const data = {
  'input': [], //{'left':'A|B+C', 'right': 'E'},
  'vars': {},
  'output': ['E'], //['E'] - переменные котрые необходимо найти
};

const excludeSymbols = [' ', '\t', '\n']

const factCheaker = (lineArray) => {
  lineArray.forEach(element => {
    // handler if got line with Fact
    if (element.startsWith('=')) {
      element = element.replace(/['=']/g, '');
      // check to Uppercase Character  A, B, C, D
      if (!/^[A-Z]*$/.test(element)) {
        //TODO can add custom validation
        throw "Note A-b character if {}"
      }
      const factsArray = [...element];
      factsArray.forEach(fact => {
        data.vars[fact] = true;
      });
    }
    // handle if ask a condition 
    else if () {

    }
  });
}

const lineParser = (line) => {
  line = line.split('#')[0];
  line = line.replace(/([' ', '\t', '\n'])/g, '');
  if (line) {
    return line
  }
  return null;
};

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
});

lineReader.on('line', (line) => {
  let lineArray = [];
  let formatLine = null;
  formatLine = lineParser(line=line);
  if (formatLine) {
    lineArray.push(formatLine);
  }
  factCheaker(lineArray=lineArray);
  // console.log(lineArray);
  // console.log('store', fileData);
  // if (line == '') { return; }
  // if(line[0] == '=') { 
  //   for(let i = 1; i < line.length; i++){
  //     data.vars.push(line[i]);
  //   };
  //   return;
  //  }
  // if(line[0] == '?'){
  //   for(let i = 1; i < line.length; i++){
  //     data.output.push(line[i]);
  //   };
  //   return;
  // }
  // data.input.push(line);
});