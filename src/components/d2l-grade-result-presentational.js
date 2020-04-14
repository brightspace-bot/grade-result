import './d2l-grade-result-icon-button.js';
import './d2l-grade-result-numeric-score.js';
import './d2l-grade-result-letter-score.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html, LitElement } from 'lit-element';
import getLocalizationTranslations from './locale.js';
import { GradeType } from '../controller/Grade.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export class D2LGradeResultPresentational extends LocalizeMixin(LitElement) {
	static get properties() {
		return {
			gradeType: { type: String },
			labelText: { type: String },
			scoreDenominator: { type: Number },
			scoreNumerator: { type: Number },
			letterGradeOptions: { type: Array },
			selectedLetterGrade: { type: String },
			includeGradeButton: { type: Boolean },
			includeReportsButton: { type: Boolean },
			gradeButtonTooltip: { type: String },
			reportsButtonTooltip: { type: String },
			readOnly: { type: Boolean },
			isGradeAutoCompleted: { type: Boolean },
			isManualOverrideActive: { type: Boolean },
			hideTitle: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			.d2l-grade-result-presentational-container {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		`;
	}
	static async getLocalizeResources(langs) {
		return await getLocalizationTranslations(langs);
	}

	constructor() {
		super();
		this.readOnly = false;
		this.includeGradeButton = false;
		this.includeReportsButton = false;
		this.selectedLetterGrade = '';
		this.isGradeAutoCompleted = false;
		this.isManualOverrideActive = false;
		this.hideTitle = false;
	}

	_onGradeButtonClick() {
		this.dispatchEvent(new CustomEvent('d2l-grade-result-grade-button-click', {
			bubbles: true,
			composed: true,
		}));
	}

	_onReportsButtonClick() {
		this.dispatchEvent(new CustomEvent('d2l-grade-result-reports-button-click', {
			bubbles: true,
			composed: true,
		}));
	}

	_isReadOnly() {
		if (this.isGradeAutoCompleted && !this.isManualOverrideActive) {
			return true;
		}
		return this.readOnly;
	}

	_getNumericScoreComponent() {
		return html`
			<d2l-grade-result-numeric-score
				.scoreNumerator=${this.scoreNumerator}
				.scoreDenominator=${this.scoreDenominator}
				?readOnly=${this._isReadOnly()}
			></d2l-grade-result-numeric-score>
		`;
	}

	_getLetterScoreComponent() {
		return html`
			<d2l-grade-result-letter-score
				.availableOptions=${this.letterGradeOptions}
				.selectedOption=${this.selectedLetterGrade}
				?readOnly=${this._isReadOnly()}
			></d2l-grade-result-letter-score>
		`;
	}

	_getScoreComponent() {
		if (this.gradeType === GradeType.Number) {
			return this._getNumericScoreComponent();
		} else if (this.gradeType === GradeType.Letter) {
			return this._getLetterScoreComponent();
		} else {
			throw new Error('INVALID GRADE TYPE PROVIDED');
		}
	}

	_getManualOverrideButtonComponent() {
		if (this.isGradeAutoCompleted) {
			let text, icon, onClick;

			if (this.isManualOverrideActive) {
				text = this.localize('clearManualOverride');
				icon = 'tier1:close-default';
				onClick = this._onManualOverrideClearClick;
			} else {
				text = this.localize('manuallyOverrideGrade');
				icon = 'tier1:edit';
				onClick = this._onManualOverrideClick;
			}

			return html`
				<d2l-button-subtle
					text=${text}
					icon=${icon}
					@click=${onClick}
				></d2l-button-subtle>
			`;
		}

		return html``;
	}

	_getTitle() {
		if (!this.hideTitle) {
			return html`
				<span class="d2l-input-label">
					${this.labelText ? html`${this.labelText}` : html``}
				</span>
			`;
		}

		return html``;
	}

	_onManualOverrideClick() {
		this.dispatchEvent(new CustomEvent('d2l-grade-result-manual-override-click', {
			composed: true,
			bubbles: true
		}));
	}

	_onManualOverrideClearClick() {
		this.dispatchEvent(new CustomEvent('d2l-grade-result-manual-override-clear-click', {
			composed: true,
			bubbles: true
		}));
	}

	render() {
		return html`
			${this._getTitle()}

			<div class="d2l-grade-result-presentational-container">

				${this._getScoreComponent()}

				${this.includeGradeButton ?  html`
					<d2l-grade-result-icon-button
						.tooltipText=${this.gradeButtonTooltip}
						ariaLabel="Grades"
						icon="tier1:grade"
						@d2l-grade-result-icon-button-click=${this._onGradeButtonClick}
					></d2l-grade-result-icon-button>
				` : html``}
				
				${this.includeReportsButton ? html`
					<d2l-grade-result-icon-button
						.tooltipText=${this.reportsButtonTooltip}
						ariaLabel="Reports"
						icon="tier1:reports"
						@d2l-grade-result-icon-button-click=${this._onReportsButtonClick}
					></d2l-grade-result-icon-button>
				` : html``}

			</div>

			${this._getManualOverrideButtonComponent()}
		`;
	}
}

customElements.define('d2l-labs-d2l-grade-result-presentational', D2LGradeResultPresentational);
