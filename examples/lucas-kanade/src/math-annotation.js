import { DependentElement } from '@living-papers/components';
import { html } from 'lit';

export default class MathAnnotation extends DependentElement {
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
      tex: {type: String},
      roottex: {type: String},
      root: {type: Object}
    };
  }

  constructor() {
    super();
    this.addEventListener('focusout', this.focusOut);
  }

  onMouseDown(e) {
    this.root.style.display = 'inline-block';
  }

  focusOut() {
    this.root.style.display = 'none';
  }


  render() {
    const katex = this.getDependency('katex');
    if (!katex || !this.tex || !this.roottex) return;

    // See https://katex.org/docs/options.html
    const options = {
      throwOnError: false,
      displayMode: true,
      leqno: false,
      fleqn: false,
      minRuleThickness: this.minRuleThickness
    };
    const root = document.createElement('span');
    root.className = 'math-annotation';
    root.style.display = 'none';
    root.style.position ='absolute';
    root.style.borderBottom = 'solid black 1px';
    root.style.transform = 'translate(200px, -100px)';
    root.style.width = '300px';
    root.style.background = 'white';
    console.log(root);
    katex.render(this.tex, root, options);
    this.root = root
    const x = document.createElement('span');
    katex.render(this.roottex, x, options)
    return html`<div class='math-annotation' style='width: 100px;' @click=${e => this.onMouseDown(e)} tabindex=0>${x}${this.root}</div>`;
  }
}