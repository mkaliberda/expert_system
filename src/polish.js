import { data } from './formatReader'

const operators = {
  '+': (x, y) => x && y,
  '|': (x, y) => x || y,
  '^': (x, y) => (x || y) && (x !== y),
  '!': x => !x,
}

const getStringByLetter = (liter) => {
  const len = data.input.length
  for (let i = 0; i < len; i++) {
    if (data.input[i].right.includes(liter) && !data.input[i].left.includes(liter)) {
      return Array.from(data.input[i].left)
    }
  }
  return []
}

export const toPolish = (tokenList) => {
  const prec = {}
  prec['!'] = 3
  prec['^'] = 2
  prec['|'] = 2
  prec['+'] = 2
  prec['('] = 1
  const opStack = []
  const postfixList = []

  tokenList.forEach((token) => {
    if (typeof prec[token] === 'undefined' && token !== ')' && token !== '(') {
      postfixList.push(token)
    }
    else if (token === '(') {
      opStack.push(token)
    }
    else if (token === ')') {
      let topToken = opStack.pop()
      while (topToken !== '(') {
        postfixList.push(topToken)
        topToken = opStack.pop()
      }
    }
    else {
      while ((opStack.length > 0) && (prec[opStack[opStack.length - 1]] >= prec[token])) {
        postfixList.push(opStack.pop())
      }
      opStack.push(token)
    }
  })

  while (opStack.length > 0) {
    postfixList.push(opStack.pop())
  }

  return postfixList
}

export const evaluate = (expr, liter) => {
  const stack = []

  expr.forEach((token) => {
    if (token in operators && token !== '!') {
      const [y, x] = [stack.pop(), stack.pop()]
      stack.push(operators[token](x, y))
    }
    else if (token in operators && token === '!') {
      const x = stack.pop()
      stack.push(operators[token](x))
    }
    else if (typeof data.vars[token] !== 'undefined') { stack.push(data.vars[token]) }
    else {
      const ev = getStringByLetter(token)
      if (ev.length === 0) {
        data.vars[token] = false
        stack.push(false)
      }
      else {
        const value = evaluate(toPolish(ev), token)
        if (typeof data.vars[token] === 'undefined') {
          if (liter.charAt(token) - 1 >= 0 && liter[liter.charAt(token) - 1] === '!') {
            data.vars[token] = !value
            stack.push(!value)
          }
          else {
            data.vars[token] = value
            stack.push(value)
          }
        }
        else if (data.vars[token] === true) {
          stack.push(true)
        }
        else {
          stack.push(false)
        }
      }
    }
  })
  const value = stack.pop()
  if ((typeof data.vars[liter] === 'undefined') || (data.vars[liter] === false)) {
    data.vars[liter] = value
  }
  return value
}
