const operators = {
  '+': (x, y) => x && y,
  '|': (x, y) => x || y,
  '^': (x, y) => x || y && x != y,
  '!': (x) => !x
};

const toPolish = (tokenList) => {
  const prec = {};
  prec["!"] = 3;
  prec["^"] = 2;
  prec["|"] = 2;
  prec["+"] = 2;
  prec["("] = 1;
  opStack = [];
  postfixList = [];

  const len = tokenList.length;

  for(let i = 0; i < len; i++) {
    if (typeof prec[tokenList[i]] === 'undefined' && tokenList[i] != ')' && tokenList[i] != '('){
      postfixList.push(tokenList[i]);
    }
    else if ( tokenList[i] == '(') {
      opStack.push(tokenList[i]);
    }
    else if (tokenList[i] == ')') {
      let topToken = opStack.pop();
      while (topToken != '(') {
        postfixList.push(topToken);
        topToken = opStack.pop();
      }
    }
    else {
      while ((opStack.length > 0) && (prec[opStack[opStack.length - 1]] >= prec[tokenList[i]])) {
        postfixList.push(opStack.pop());
      }
      opStack.push(tokenList[i]);
    }
  }

  while (opStack.length > 0) {
    postfixList.push(opStack.pop());
  }

  return /*" " + */postfixList;//.join('');
}

let evaluate = (expr) => {
  let stack = [];
  
  expr.forEach((token) => {
      if (token in operators && token != "!") {
          let [y, x] = [stack.pop(), stack.pop()];
          stack.push(operators[token](x, y));
      }
      else if (oken in operators && token == "!"){
        let x = stack.pop();
        stack.push(operators[token](x));
      }
      else {
          stack.push(token);
      }
  });

  return stack.pop();
};

const arr = ['A', '|', 'B', '+', 'C'];
const arr2 = ['(', 'F', '|','G', ')','+', 'H'];
const arr3 = [ true, false, '|', false, '+' ];

console.log(toPolish(arr2));
console.log(evaluate(arr3));
module.exports = {
  toPolish,
}
