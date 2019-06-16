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

lineReaderNew.on('line', (line) => {
  const formatter = new Formatter()
  const cleanLine = formatter.clearReadingLine(line)

  if (cleanLine) {
    try {
      formatter.formatterLineArray(cleanLine)
    } catch (error) {
      console.log(error)
      process.exit()
    }
  }
})


lineReaderNew.on('close', () => {
  console.log('data', data)
})
