import { Controller, GradeType } from './controller.js';
import { html, LitElement } from 'lit-element';
import getLocalizationTranslations from './locale.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export class D2LGradeResult extends LocalizeMixin(LitElement) {
	static get properties() {
		return {
			href: { type: String },
			token: { type: String },
			_labelText: { type: String },
			_scoreNumerator: { type: String },
			_scoreDenominator: { type: String },
			_includeGradeButton: { type: Boolean },
			_includeReportsButton: { type: Boolean },
			_gradeButtonTooltip: { type: String },
			_reportsButtonTooltip: { type: String },
			_readOnly: { type: Boolean },
			_gradeType: { type: String },
			_letterGradeOptions: { type: Array },
			_selectedLetterGrade: { type: String },
			_isGradeAutoCompleted: { type: Boolean },
			_isManualOverrideActive: { type: Boolean },
			disableController: { type: Boolean }
		};
	}

	static async getLocalizeResources(langs) {
		return await getLocalizationTranslations(langs);
	}

	constructor() {
		super();

		this.href = undefined;
		this.token = undefined;
		this.disableController = false;

		this._readOnly = false;
		this._labelText = '';

		this._gradeType = GradeType.Number;
		this._scoreNumerator = 0;
		this._scoreDenominator = 0;
		this._letterGradeOptions = [];
		this._selectedLetterGrade = '';

		// hard coded as disabled as not yet supported by API
		this._includeGradeButton = false;
		this._includeReportsButton = false;
		this._gradeButtonTooltip = undefined;
		this._reportsButtonTooltip = undefined;
		this.manuallyOverriddenGrade = undefined;
		this._isGradeAutoCompleted = false;
		this._isManualOverrideActive = false;
	}

	async updated() {
		super.updated();
		if (this.href && this.token && !this.controller && !this.disableController) {
			await this._initialize();
		}
	}

	async _initialize() {
		this.controller = new Controller(this.href, this.token);
		const grade = await this.controller.requestGrade();
		this._parseGrade(grade);
	}

	async _updateGrade() {
		let updatedGrade;
		if (this._gradeType === GradeType.Number) {
			updatedGrade = await this.controller.updateGrade(this._scoreNumerator);
		} else {
			updatedGrade = await this.controller.updateGrade(this._selectedLetterGrade);
		}
		this._parseGrade(updatedGrade);
	}

	_parseGrade(grade) {
		this._gradeType = grade.getScoreType();
		if (grade.isNumberGrade()) {
			this._scoreNumerator = grade.getScore();
			this._scoreDenominator = grade.getScoreOutOf();
		} else {
			this._selectedLetterGrade = grade.getScore();
			this._letterGradeOptions = grade.getScoreOutOf();
		}
	}

	render() {
		return html`
			<d2l-labs-d2l-grade-result-presentational
				.gradeType=${this._gradeType}
				labelText=${this.localize('overallGrade')}
				scoreNumerator=${this._scoreNumerator}
				scoreDenominator=${this._scoreDenominator}
				.letterGradeOptions=${this._letterGradeOptions}
				selectedLetterGrade=${this._selectedLetterGrade}
				gradeButtonTooltip=${this._gradeButtonTooltip}
				reportsButtonTooltip=${this._reportsButtonTooltip}
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
		this._scoreNumerator = e.detail.value;
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
		if (this._gradeType === GradeType.Number && this._scoreDenominator !== undefined) {
			this.manuallyOverriddenGrade = this._scoreNumerator;
		} else if (this._gradeType === GradeType.Letter && this._selectedLetterGrade !== undefined) {
			this.manuallyOverriddenGrade = this._selectedLetterGrade;
		}
	}

	_handleManualOverrideClearClick(e) {
		console.log(e);
		this._isManualOverrideActive = false;
		if (this.manuallyOverriddenGrade) {
			if (this._gradeType === GradeType.Number) {
				this._scoreNumerator = this.manuallyOverriddenGrade;
			} else if (this._gradeType === GradeType.Letter) {
				this._selectedLetterGrade = this.manuallyOverriddenGrade;
			}
		}
	}
}

customElements.define('d2l-labs-d2l-grade-result', D2LGradeResult);
