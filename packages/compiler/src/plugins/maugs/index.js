import {
  visitNodes, setValueProperty, removeChild, getNodeName, getChildren, extractText
} from '@living-papers/ast';

export default function (ast) {
  let definitions = [];
  visitNodes(ast, (node, parent) => {
    if (node.name === 'definitions') {
      const lines = getChildren(node)
        .map(child => extractText(child).trim().split('\n'))
        .flat()
        .map(line => {
          const parts = line.split(':');
          if (parts.length != 3) {
            // TODO: handle incorrect parsing
            return null;
          }
          let replace = parts[0].trim();
          let id = parts[1].trim() || null;
          let definition = parts[2].trim();
          let symbol = replace[0] === "@" ? replace.slice(1) : replace;
          return {
            replace,
            symbol,
            id,
            definition,
          };
        });
      definitions = definitions.concat(lines);
      removeChild(parent, node);
    }
  });

  // TODO: sort definitions so that superstrings are before substrings
  definitions
    .sort((b, a) => a.symbol.length - b.symbol.length)
    .map((d, i) => ({ ...d, id: d.id || i}));
  
  console.log('IDs =\n', [...new Set(definitions.map(d => d.id))].join('\n'));

  definitions = JSON.stringify(definitions);

  visitNodes(ast, (node) => {
    if (['math', 'equation'].includes(getNodeName(node))) {
      setValueProperty(node, 'definitions', definitions);
    }
  });

  return ast;
}
