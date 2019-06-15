import fs from 'fs'
import readline from 'readline'
import Formatter, { data } from './formatReader'


const lineReaderNew = readline.createInterface({
  input: fs.createReadStream(process.argv[2]),
})

const lineArray = []

lineReaderNew.on('line', (line) => {
  const formatter = new Formatter()
  const cleanLine = formatter.clearReadingLine(line)

  if (cleanLine) {
    lineArray.push(cleanLine)
  }
  try {
    formatter.formatterLineArray(lineArray)
  } catch (error) {
    console.error(error)
  }
})


lineReaderNew.on('close', (line) => {
  console.log(data, line)
})
