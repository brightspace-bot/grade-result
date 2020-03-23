import { html, LitElement } from 'lit-element';
import getLocalizationTranslations from './locale.js';
import { GradeType } from './d2l-grade-result-presentational.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export class D2LGradeResult extends LocalizeMixin(LitElement) {
	static get properties() {
		return {
			href: { type: String },
			token: { type: String },
			_labeltext: { type: String },
			_scorenumerator: { type: String },
			_scoredenominator: { type: String },
			_includeGradeButton: { type: Boolean },
			_includeReportsButton: { type: Boolean },
			_gradebuttontooltip: { type: String },
			_reportsbuttontooltip: { type: String },
			_readOnly: { type: Boolean },
			_gradeType: { type: String },
			_letterGradeOptions: { type: Array },
			_selectedLetterGrade: { type: String },
			_isGradeAutoCompleted: { type: Boolean },
			_isManualOverrideActive: { type: Boolean }
		};
	}

	static async getLocalizeResources(langs) {
		return await getLocalizationTranslations(langs);
	}

	constructor() {
		super();

		this._gradeType = GradeType.Number;
		this._labeltext = '';
		this._scorenumerator = 5;
		this._scoredenominator = 20;
		this._includeGradeButton = true;
		this._includeReportsButton = true;
		this._gradebuttontooltip = 'Assignment 1 Grade Item Attached';
		this._reportsbuttontooltip = 'Class and user statistics';
		this._readOnly = false;
		this._isGradeAutoCompleted = true;
		this._isManualOverrideActive = false;
		this._letterGradeOptions = ['A', 'B', 'C'];
		this._selectedLetterGrade = 'C';

		this.manuallyOverriddenGrade = undefined;
	}

	render() {
		return html`
			<d2l-labs-d2l-grade-result-presentational
				.gradeType=${this._gradeType}
				labeltext=${this.localize('overallGrade')}
				scorenumerator=${this._scorenumerator}
				scoredenominator=${this._scoredenominator}
				.letterGradeOptions=${this._letterGradeOptions}
				selectedLetterGrade=${this._selectedLetterGrade}
				gradebuttontooltip=${this._gradebuttontooltip}
				reportsbuttontooltip=${this._reportsbuttontooltip}
				?includeGradeButton=${this._includeGradeButton}
				?includeReportsButton=${this._includeReportsButton}
				?readOnly=${this._readOnly}
				?isGradeAutoCompleted=${this._isGradeAutoCompleted}
				?isManualOverrideActive=${this._isManualOverrideActive}
				@d2l-grade-result-grade-change=${this._handleGradeChange}
				@d2l-grade-result-letter-score-selected=${this._handleLetterGradeSelected}
				@d2l-grade-result-grade-button-click=${this._handleGradeButtonClick}
				@d2l-grade-result-reports-button-click=${this._handleReportsButtonClick}
				@d2l-grade-result-manual-override-button-manual-override-click=${this._handleManualOverrideClick}
				@d2l-grade-result-manual-override-button-manual-override-clear-click=${this._handleManualOverrideClearClick}
			></d2l-labs-d2l-grade-result-presentational>
		`;
	}

	_handleGradeChange(e) {
		console.log(e);
		this._scorenumerator = e.detail.value;
	}

	_handleGradeButtonClick(e) {
		console.log(e);
	}

	_handleReportsButtonClick(e) {
		console.log(e);
	}

	_handleLetterGradeSelected(e) {
		console.log(e);
		this._selectedLetterGrade = e.detail.option;
	}

	_handleManualOverrideClick(e) {
		console.log(e);
		this._isManualOverrideActive = true;
		if (this._gradeType === GradeType.Number && this._scoredenominator !== undefined) {
			this.manuallyOverriddenGrade = this._scorenumerator;
		} else if (this._gradeType === GradeType.Letter && this._selectedLetterGrade !== undefined) {
			this.manuallyOverriddenGrade = this._selectedLetterGrade;
		}
	}

	_handleManualOverrideClearClick(e) {
		console.log(e);
		this._isManualOverrideActive = false;
		if (this.manuallyOverriddenGrade) {
			if (this._gradeType === GradeType.Number) {
				this._scorenumerator = this.manuallyOverriddenGrade;
			} else if (this._gradeType === GradeType.Letter) {
				this._selectedLetterGrade = this.manuallyOverriddenGrade;
			}
		}
	}
}

customElements.define('d2l-labs-d2l-grade-result', D2LGradeResult);
