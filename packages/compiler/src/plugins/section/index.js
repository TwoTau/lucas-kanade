import {
  appendChildren, createComponentNode, createProperties, createTextNode, extractText, getNodeName, queryNodes, replaceChild, visitNodes
} from '@living-papers/ast';

// TODO pass in from context?
const aliases = new Map([
  ['abstract', 'Abstract'],
  ['acknowledgments', 'Acknowledgments'],
  ['references', 'References']
]);

// TODO maintain one-to-one top-level AST mapping (div.name)?
export default function (ast) {
  visitNodes(ast, (node, parent) => {
    if (aliases.has(node.name)) {
      const alias = aliases.get(node.name);
      replaceChild(parent, node, [
        createComponentNode(
          'h1',
          createProperties({ nonumber: true }),
          [createTextNode(alias)]
        ),
        ...node.children
      ]);
    }
  });

  const headings = queryNodes(ast, (node) => /^h\d$/i.test(getNodeName(node)))
    .map(node => ({
      level: +getNodeName(node)[1],
      title: extractText(node)
    }));
  // console.log(JSON.stringify(headings));

  // Verify that headings are in order
  let warnings = [];
  let tocChildren = [createComponentNode('ul', null, [])];
  for (let i = 1; i < headings.length; i++) {
    const currLevel = headings[i].level;
    const prevLevel = headings[i - 1].level;
    if (currLevel > prevLevel + 1) {
      warnings.push(` * H${currLevel} "${headings[i].title}" has a H${prevLevel} parent heading.`);
      continue;
    }

    // TODO: nesting
    const li = createComponentNode('li', null, [createTextNode(headings[i].title)]);
    tocChildren.push(li);
  }
  if (warnings.length) {
    console.warn('Accessibility warnings in table of contents:');
    console.warn(warnings.join('\n'));
  }


  const toc = createComponentNode('table-of-contents', createProperties({ yay: 5 }), tocChildren)
  // console.log(JSON.stringify(toc));
  appendChildren(ast, toc);

  return ast;
}
