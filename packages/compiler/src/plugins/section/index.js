import {
  appendChildren, createComponentNode, createProperties, createTextNode, extractText, getNodeName, getPropertyValue, prependChildren, queryNodes, replaceChild, visitNodes
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
      title: extractText(node),
      id: getPropertyValue(node, 'id'),
    }))
  // console.log(JSON.stringify(headings));

  // Verify that headings are in order
  let warnings = [];
  let tocChildren = [createComponentNode('ol', null, [])];
  let prevLevel = 0;
  for (let i = 1; i < headings.length; i++) {
    let { level, title, id } = headings[i];
    if (level > prevLevel + 1) {
      warnings.push(` * H${level} "${headings[i].title}" has H${prevLevel} parent "${headings[i - 1].title}". Treating as H${prevLevel + 1}`);
      level = prevLevel + 1;
    }

    const ol = createComponentNode('ol', null, []);
    let textEl = createTextNode(title);
    if (id) {
      textEl = createComponentNode(
        'a',
        id ? createProperties({ href: `#${id}` }) : null,
        [textEl]
      );
    }
    const li = createComponentNode('li', null, [textEl, ol]);

    while (tocChildren.length > level) {
      tocChildren.pop();
    }
    appendChildren(tocChildren[tocChildren.length - 1], li);
    tocChildren.push(ol);
    prevLevel = level;
  }
  if (warnings.length) {
    console.warn('Accessibility warnings in table of contents:');
    console.warn(warnings.join('\n'));
  }

  const toc = createComponentNode('table-of-contents', createProperties({ }), [tocChildren[0]])
  prependChildren(ast, toc);

  return ast;
}
