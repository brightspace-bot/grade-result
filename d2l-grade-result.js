// import { css, html, LitElement } from 'lit-element/lit-element.js';
// import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

// class D2lGradeResult extends LocalizeMixin(LitElement) {

// 	static get properties() {
// 		return {
// 			prop1: { type: String },
// 		};
// 	}

// 	static get styles() {
// 		return css`
// 			:host {
// 				display: inline-block;
// 			}
// 			:host([hidden]) {
// 				display: none;
// 			}
// 		`;
// 	}

// 	constructor() {
// 		super();

// 		this.prop1 = 'd2l-grade-result';
// 	}

// 	render() {
// 		return html`
// 			<h2>Hello ${this.prop1}!</h2>
// 			<div>Localization Example: ${this.localize('myLangTerm')}</div>
// 		`;
// 	}
// }

// customElements.define('d2l-labs-d2l-grade-result', D2lGradeResult);

import './components/d2l-grade-result.js';
