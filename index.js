const data = {
  'input': [], //{'left':'A|B+C', 'right': 'E'},
  'vars': {},
  'output': ['E'], //['E'] - переменные котрые необходимо найти
}

const operators = {
  '+': (x, y) => x && y,
  '|': (x, y) => x || y,
  '^': (x, y) => x || y && x != y,
  '!': (x) => !x
}

const excludeSymbols = [' ', '\t', '\n']

class Formatter {

  testAlphabet(element) {
    if (!/^[A-Z]*$/.test(element)) {
      //TODO can add custom validation
      throw `Not A-b character in ${element}`
    }
    return [...element]
  }

  lineToStore(line) {
    line = line.split('#')[0]
    line = line.replace(/([' ', '\t', '\n'])/g, '')
    if (line) {
      return line
    }
    return null
  }

  rulesFormatter(element) {

  }

  lineFormatter(lineArray) {
    lineArray.forEach(element => {
      // handler if a Fact
      if (element.startsWith('=')) {
        element = element.replace(/['=']/g, '')
        this.testAlphabet(element).forEach(fact => {
          data.vars[fact] = true
        })
      }
      // handle if a condition 
      else if (element.indexOf('?') != -1) {
        element = element.replace(/['?']/g, '')
        data.output = this.testAlphabet(element = element)
      }
      // handle if a rules 
      else if (element.indexOf('=>') != -1) {
        rulesFormatter(element = element)
      }
    })
  }
}

const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
})


lineReader.on('line', (line) => {
  let lineArray = []
  let formatLine = null
  // formatLine = lineToStore(line=line)
  formatter = new Formatter()
  formatLine = formatter.lineToStore(line = line)
  if (formatLine) {
    lineArray.push(formatLine)
  }
  try {
    formatter.lineFormatter(lineArray = lineArray)
  } catch (error) {
    console.error(error)
  }
  // console.log(lineArray)
  // console.log('store', fileData)
  // if (line == '') { return }
  // if(line[0] == '=') { 
  //   for(let i = 1 i < line.length i++){
  //     data.vars.push(line[i])
  //   }
  //   return
  //  }
  // if(line[0] == '?'){
  //   for(let i = 1 i < line.length i++){
  //     data.output.push(line[i])
  //   }
  //   return
  // }
  // data.input.push(line)
})


lineReader.on('close', (line) => {
  console.log(data)
})