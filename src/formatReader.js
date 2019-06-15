/* eslint-disable class-methods-use-this */

export const data = {
  input: [], // {'left':'A|B+C', 'right': 'E'},
  vars: {},
  output: [], // ['E'] - переменные котрые необходимо найти
}


class Formatter {
  killSpaceRegex = /([' ', '\t', '\n'])/g

  testAlphabet(element) {
    if (!/^[A-Z]*$/.test(element)) {
      // TODO can add custom validation
      throw new Error(`Not A-b character in ${element}`)
    }
    return [...element]
  }

  clearReadingLine(line) {
    const lineWtComment = line.split('#')[0]
    const lineWtWhitespace = lineWtComment.replace(this.killSpaceRegex, '')
    if (line) return lineWtWhitespace
    return null
  }

  rulesFormatter(element) {
    const elementArray = element.split('=>')
    const obj = {
      left: elementArray[0],
      right: elementArray[1],
    }
    data.input.push(obj)
  }

  formatterLineArray(element) {
    // handler if a Fact
    if (element.startsWith('=')) {
      const elementClean = element.replace(/['=']/g, '')
      this.testAlphabet(elementClean).forEach((fact) => {
        data.vars[fact] = true
      })
    }
    // handle if a condition
    else if (element.indexOf('?') !== -1) {
      const elementClean = element.replace(/['?']/g, '')
      data.output = this.testAlphabet(elementClean)
    }
    // handle if a rules
    else if (element.indexOf('=>') !== -1) {
      this.rulesFormatter(element)
    }
  }
}


export default Formatter