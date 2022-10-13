import { DependentElement } from './dependent-element.js';

export class TexMath extends DependentElement {
  static get dependencies() {
    return [
      {
        name: 'katex',
        version: '0.15.3',
        module: 'dist/katex.mjs',
        main: 'dist/katex.min.js',
        css: 'dist/katex.min.css'
      }
    ]
  }

  static get properties() {
    return {
      mode: { type: String },
      code: { type: String },
      leqno: { type: Boolean },
      fleqn: { type: Boolean, converter: v => v !== 'false' },
      minRuleThickness: { type: Number },
      definitions: { type: Array }
    };
  }

  constructor() {
    super();
    this.mode = 'display';
    this.leqno = false;
    this.fleqn = false;
    this.definitions = this.hasAttribute('definitions') ? JSON.parse(this.getAttribute('definitions')) : [];
  }

  initialChildNodes(nodes) {
    // attempt to extract code from first child
    if (!this.hasAttribute('code') && nodes.length) {
      this.code = nodes[0].textContent;
    }
  }

  addAugmentations() {
    let code = this.code;
    for (let i = 0; i < this.definitions.length; i++) {
      const { replace, symbol } = this.definitions[i];
      code = code.replaceAll(replace, `\\htmlClass{maug maug-${i}}{${symbol}}`);
    }
    return code;
  }

  prepareMath() {
    return this.addAugmentations();
  }

  render() {
    const katex = this.getDependency('katex');
    if (!katex || !this.code) return;

    // See https://katex.org/docs/options.html
    const displayMode = this.mode === 'display';
    const options = {
      throwOnError: false,
      displayMode,
      leqno: this.leqno,
      fleqn: this.fleqn,
      minRuleThickness: this.minRuleThickness,
      trust: ({ command }) => command === '\\htmlClass',
      strict: (errorCode) => errorCode === "htmlExtension" ? "ignore" : "warn",
    };

    const root = document.createElement(displayMode ? 'div' : 'span');
    const math = this.prepareMath();
    katex.render(math, root, options);
    setTimeout(() => {
      const maugs = root.querySelectorAll('.enclosing');
      for (const el of maugs) {
        const index = +[...el.classList].find(c => c.startsWith('maug-')).slice('maug-'.length);
        let { symbol, definition } = this.definitions[index];
        symbol = symbol.replaceAll('@', '');
        definition = definition.replaceAll('@', '');
        el.addEventListener('click', () => {
          console.log(`Symbol: ${symbol}\nDefinition: ${definition}`);
        });
        el.setAttribute("tabindex", 0);
      }
    }, 0);
    return root;
  }
}
