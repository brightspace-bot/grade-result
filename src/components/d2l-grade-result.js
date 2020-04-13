import { Grade, GradeType } from '../controller/Grade.js';
import { html, LitElement } from 'lit-element';
import getLocalizationTranslations from './locale.js';
import { GradesController } from '../controller/GradesController.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export class D2LGradeResult extends LocalizeMixin(LitElement) {
	static get properties() {
		return {
			href: { type: String },
			token: { type: String },
			disableAutoSave: { type: Boolean },
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
			_manuallyOverriddenGrade: {type: Object },
			_controller: { type: Object }
		};
	}

	static async getLocalizeResources(langs) {
		return await getLocalizationTranslations(langs);
	}

	constructor() {
		super();

		this.href = undefined;
		this.token = undefined;
		this.disableAutoSave = false;

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
		this._isGradeAutoCompleted = false;
		this._isManualOverrideActive = false;

		this._manuallyOverriddenGrade = undefined;
		this._controller = undefined;
	}

	async firstUpdated() {
		super.firstUpdated();

		try {
			this._controller = new GradesController(this.href, this.token);
			await this._requestGrade();
			this.dispatchEvent(new CustomEvent('d2l-grade-result-initialized-success', {
				composed: true,
				bubbles: true
			}));
		} catch (e) {
			this.dispatchEvent(new CustomEvent('d2l-grade-result-initialized-error', {
				composed: true,
				bubbles: true,
				detail: {
					error: e
				}
			}));
		}
	}

	async _requestGrade() {
		this._parseGrade(await this._controller.requestGrade());
	}

	async _updateGrade(value) {
		this._parseGrade(await this._controller.updateGrade(value));
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

	async updateGrade(value) {
		try {
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

	async _handleGradeChange(e) {
		if (!this.disableAutoSave) {
			await this.updateGrade(e.detail.value);
		}
	}

	_handleManualOverrideClick() {
		this._isManualOverrideActive = true;
		this._manuallyOverriddenGrade = new Grade(this._gradeType, this._scoreNumerator, this._scoreDenominator, this._selectedLetterGrade, this._letterGradeOptions);
		this.dispatchEvent('d2l-grade-result-manual-override-click', {
			composed: true,
			bubbles: true
		});
	}

	_handleManualOverrideClearClick() {
		this._isManualOverrideActive = false;
		this._parseGrade(this._manuallyOverriddenGrade);
		this._manuallyOverriddenGrade = undefined;
		this.dispatchEvent('d2l-grade-result-manual-override-clear-click', {
			composed: true,
			bubbles: true
		});
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
}

customElements.define('d2l-labs-d2l-grade-result', D2LGradeResult);
