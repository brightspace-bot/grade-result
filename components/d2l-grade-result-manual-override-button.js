import '@brightspace-ui/core/components/button/button-subtle.js';
import { html, LitElement } from 'lit-element';
import getLocalizationTranslations from './locale.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export class D2LGradeResultManualOverrideButton extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			isManualOverrideActive: { type: Boolean }
		};
	}

	static async getLocalizeResources(langs) {
		return await getLocalizationTranslations(langs);
	}

	render() {
		if (this.isManualOverrideActive) {
			return html`
				<d2l-button-subtle
					text=${this.localize('clearManualOverride')}
					icon="tier1:close-default"
					@click=${this._onManualOverrideClearClick}
				></d2l-button-subtle>
			`;
		} else {
			return html`
				<d2l-button-subtle
					text=${this.localize('manuallyOverrideGrade')}
					icon="tier1:edit"
					@click=${this._onManualOverrideClick}
				></d2l-button-subtle>
			`;
		}
	}

	_onManualOverrideClick() {
		this.dispatchEvent(new CustomEvent('d2l-grade-result-manual-override-button-manual-override-click', {
			composed: true,
			bubbles: true
		}));
	}

	_onManualOverrideClearClick() {
		this.dispatchEvent(new CustomEvent('d2l-grade-result-manual-override-button-manual-override-clear-click', {
			composed: true,
			bubbles: true
		}));
	}
}

customElements.define('d2l-grade-result-manual-override-button', D2LGradeResultManualOverrideButton);
