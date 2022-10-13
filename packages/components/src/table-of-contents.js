import { html } from 'lit';
import { ArticleElement } from './article-element.js';

export class TableOfContents extends ArticleElement {
  constructor() {
    super();
  }

  render() {
    return html`${this.__children}`;
  }
}
