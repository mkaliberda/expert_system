import fs from 'fs'
import readline from 'readline'
import Formatter, {
  data
} from './formatReader'


const lineReaderNew = readline.createInterface({
  // if ( process.argv[2] ) {
  //   throw new Error(`Not A-b character in ${element}`)
  // }
  input: fs.createReadStream(process.argv[2]),
})

const lineArray = []

lineReaderNew.on('line', (line) => {
  const formatter = new Formatter()
  const cleanLine = formatter.clearReadingLine(line)

  if (cleanLine) {
    try {
      formatter.formatterLineArray(cleanLine)
    } catch (error) {
      console.error(error)
    }
  }
})


lineReaderNew.on('close', (line) => {
  console.log('data', data)
})