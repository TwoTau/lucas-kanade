import { html } from 'lit';
import { ArticleElement } from './article-element.js';

export class TableOfContents extends ArticleElement {
  constructor() {
    super();
  }

  render() {
    return html`<nav role="navigation">
      <strong>Contents</strong>
      ${this.__children}
    </nav>`;
  }
}
