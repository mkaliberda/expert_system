const data = {
  'input': [], //{'left':'A|B+C', 'right': 'E'},
  'vars': {},
  'output': ['E'], //['E'] - переменные котрые необходимо найти
}

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
    let elementArray = element.split('=>')
    let obj = {
    'left': elementArray[0],
    'right': elementArray[1]
    }
    data.input.push(obj)
  }

  formatterLineArray(lineArray) {
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
        this.rulesFormatter(element = element)
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
    formatter.formatterLineArray(lineArray = lineArray)
  } catch (error) {
    console.error(error)
  }
})


lineReader.on('close', (line) => {
  console.log(data)
})


export default (a, b) => a + b

console.log('tag', '1111')
