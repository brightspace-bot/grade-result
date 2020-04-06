import { html, LitElement } from 'lit-element';
import { Controller } from '../controller/GradesController.js';
import getLocalizationTranslations from './locale.js';
import { GradeType } from '../controller/Grade.js';
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
			_isManualOverrideActive: { type: Boolean }
		};
	}

	static async getLocalizeResources(langs) {
		return await getLocalizationTranslations(langs);
	}

	constructor() {
		super();

		this.href = undefined;
		this.token = undefined;

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

	async firstUpdated() {
		super.firstUpdated();
		if (this.href && this.token && !this.controller) {
			try {
				this.controller = new Controller(this.href, this.token);
				await this._requestGrade();
				this.dispatchEvent(new CustomEvent('d2l-grade-result-intitialized-success', {
					composed: true,
					bubbles: true
				}));
			} catch (e) {
				this.dispatchEvent(new CustomEvent('d2l-grade-result-intitialized-error', {
					composed: true,
					bubbles: true,
					detail: {
						error: e
					}
				}));
			}
		}
	}

	async _requestGrade() {
		const grade = await this.controller.requestGrade();
		this._parseGrade(grade);
	}

	async _updateGrade(value) {
		let updatedGrade;
		if (this._gradeType === GradeType.Number) {
			updatedGrade = await this.controller.updateGrade(value);
			this._scoreNumerator = value;
		} else {
			updatedGrade = await this.controller.updateGrade(value);
			this._selectedLetterGrade = value;
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
				@d2l-grade-result-letter-score-selected=${this._handleGradeChange}
				@d2l-grade-result-manual-override-click=${this._handleManualOverrideClick}
				@d2l-grade-result-manual-override-clear-click=${this._handleManualOverrideClearClick}
			></d2l-labs-d2l-grade-result-presentational>
		`;
	}

	async _handleGradeChange(e) {
		try {
			const { value } = e.detail;
			await this._updateGrade(value);
			this.dispatchEvent(new CustomEvent('d2l-grade-result-grade-updated-success', {
				composed: true,
				bubbles: true,
				detail: {
					value
				}
			}));
		} catch (e) {
			this.dispatchEvent(new CustomEvent('d2l-grade-result-grade-updated-error', {
				composed: true,
				bubbles: true,
				detail: {
					error: e
				}
			}));
		}
	}

	// document but can be deleted
	// @d2l-grade-result-grade-button-click=${this._handleGradeButtonClick}
	// @d2l-grade-result-reports-button-click=${this._handleReportsButtonClick}
	_handleGradeButtonClick(e) {
		console.log(e);
	}

	_handleReportsButtonClick(e) {
		console.log(e);
	}

	_handleManualOverrideClick() {
		this._isManualOverrideActive = true;
		if (this._gradeType === GradeType.Number && this._scoreDenominator !== undefined) {
			this.manuallyOverriddenGrade = this._scoreNumerator;
		} else if (this._gradeType === GradeType.Letter && this._selectedLetterGrade !== undefined) {
			this.manuallyOverriddenGrade = this._selectedLetterGrade;
		}
		this.dispatchEvent('d2l-grade-result-manual-override-click', {
			composed: true,
			bubbles: true
		});
	}

	_handleManualOverrideClearClick() {
		this._isManualOverrideActive = false;
		if (this.manuallyOverriddenGrade) {
			if (this._gradeType === GradeType.Number) {
				this._scoreNumerator = this.manuallyOverriddenGrade;
			} else if (this._gradeType === GradeType.Letter) {
				this._selectedLetterGrade = this.manuallyOverriddenGrade;
			}
		}
		this.dispatchEvent('d2l-grade-result-manual-override-clear-click', {
			composed: true,
			bubbles: true
		});
	}
}

customElements.define('d2l-labs-d2l-grade-result', D2LGradeResult);
