import { html } from 'lit';
import { ArticleElement } from './article-element.js';

export class TableOfContents extends ArticleElement {
  constructor() {
    super();
  }

  render() {
    console.log(this.__children);

    return html`<nav role="navigation">
      <strong>Contents</strong>
      ${this.__children}
    </nav>`;
  }
}
