const codegen = (ast) =>{
  let js = '';
  ast.forEach((node)=>{
      js += genNode(node);
  });

  return js;

};

// const rules = {
//   declaration: (node) {
//     return 'let ' + node.identifier + '=' + genNode(node.name) + ';\n'
//   }
// }

const genNode = (node)=>{
  if(node.type === 'declaration'){
    return 'let ' + node.identifier + '=' + genNode(node.value) + ';\n'

  } else if (node.type === 'assignment'){
    return node.identifier + ' = ' + genNode(node.value);

  } else if (node.type === 'identifier'){
    return node.name;

  } else if (node.type === 'number'){
    return node.value;

  } else if (node.type === 'math'){
    return genNode(node.left) + ' '
          + node.operator + ' '
          + genNode(node.right);

  } else if (node.type === 'if'){
    return 'if ('+
            genNode(node.condition) +
          ') {\n' +
            codegen(node.body) +
          '}';

  } else if(node.type === 'while'){
      return 'while ('+
              genNode(node.condition) +
            ') {\n' +
              codegen(node.body) +
            '}';

  } else if(node.type === 'comparison'){

      const operators = {
        '~=' : '!==',
        '==' : '===',
        '<=' : '<==',
        '>=' : '>==',
        '<'  : '<',
        '>'  : '>',
      }

      const jsOperator = operators[node.operator];

      return genNode(node.left) + ' '
            + jsOperator + ' '
            + genNode(node.right);
        // return node.left + ' ' + node.operator + ' ' + node.right;
  } else {
    throw new Error ('Unkonwn node: ' + JSON.stringify(node));
  }
}

module.exports = codegen;
