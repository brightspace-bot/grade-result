/* eslint-disable prefer-arrow-callback */
import '../d2l-grade-result.js';
import '../src/components/d2l-grade-result-presentational.js';
import { expect, fixture, html } from '@open-wc/testing';

const componentManualOverride = html`
	<d2l-labs-d2l-grade-result-presentational
		gradeType="Numeric"
		labelText="Overall Grade"
		scoreNumerator="5"
		scoreDenominator="20"
		isGradeAutoCompleted
		includeGradeButton
		includeReportsButton
		gradeButtonTooltip="Assignment 1 Grade Item Attached"
		reportsButtonTooltip="Class and user statistics"
	></d2l-labs-d2l-grade-result-presentational>
`;

const componentManualOverrideClear = html`
	<d2l-labs-d2l-grade-result-presentational
		gradeType="Numeric"
		labelText="Overall Grade"
		scoreNumerator="5"
		scoreDenominator="20"
		isGradeAutoCompleted
		isManualOverrideActive
		includeGradeButton
		includeReportsButton
		gradeButtonTooltip="Assignment 1 Grade Item Attached"
		reportsButtonTooltip="Class and user statistics"
	></d2l-labs-d2l-grade-result-presentational>
`;

const componentNumericScore = html`
	<d2l-labs-d2l-grade-result-presentational
		gradeType="Numeric"
		labelText="Overall Grade"
		scoreNumerator="5"
		scoreDenominator="20"
	></d2l-labs-d2l-grade-result-presentational>
`;

const componentLetterScore = html`
	<d2l-labs-d2l-grade-result-presentational
		gradeType="LetterGrade"
		labelText="Overall Grade"
		.letterGradeOptions=${['A', 'B', 'C']}
		selectedLetterGrade="C"
	></d2l-labs-d2l-grade-result-presentational>
`;

const eventTimeoutMS = 10000;

const getGradesButton = (el) => {
	return el
		.shadowRoot.querySelector('d2l-grade-result-icon-button')
		.shadowRoot.querySelector('d2l-button-icon');
};

const getReportsButton = (el) => {
	return el
		.shadowRoot.querySelectorAll('d2l-grade-result-icon-button')[1]
		.shadowRoot.querySelector('d2l-button-icon');
};

const getManualOverrideButton = (el) => {
	return el.shadowRoot.querySelector('d2l-button-subtle');
};

const getNumericScore = (el) => {
	return el.shadowRoot.querySelector('d2l-grade-result-numeric-score');
};

const getNumericScoreInput = (el) => {
	return getNumericScore(el).shadowRoot.querySelector('d2l-input-text');
};

const getLetterScore = (el) => {
	return el.shadowRoot.querySelector('d2l-grade-result-letter-score');
};

const getLetterScoreSelect = (el) => {
	return getLetterScore(el).shadowRoot.querySelector('select');
};

describe('d2l-labs-d2l-grade-result', () => {
	it('should pass all axe tests', async function() {
		const el = await fixture(html`<d2l-labs-d2l-grade-result></d2l-labs-d2l-grade-result>`);
		await expect(el).to.be.accessible();
	});

	it('click grade button event', async function() {
		return new Promise((resolve, reject) => {
			fixture(componentManualOverride).then(el => {
				const event = 'd2l-grade-result-grade-button-click';
				el.addEventListener(event, resolve);
				getGradesButton(el).click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('click reports button event', async function() {
		return new Promise((resolve, reject) => {
			fixture(componentManualOverride).then(el => {
				const event = 'd2l-grade-result-reports-button-click';
				el.addEventListener(event, resolve);
				getReportsButton(el).click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('click manual override button event', async function() {
		return new Promise((resolve, reject) => {
			fixture(componentManualOverride).then(el => {
				const event = 'd2l-grade-result-manual-override-click';
				el.addEventListener(event, resolve);
				getManualOverrideButton(el).click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('click manual override clear button event', async function() {
		return new Promise((resolve, reject) => {
			fixture(componentManualOverrideClear).then(el => {
				const event = 'd2l-grade-result-manual-override-clear-click';
				el.addEventListener(event, resolve);
				getManualOverrideButton(el).click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('number grade changed', async function() {
		return new Promise((resolve, reject) => {
			fixture(componentNumericScore).then(el => {
				const event = 'd2l-grade-result-grade-change';
				const value = 10;
				el.addEventListener(event, (e) => {
					const input = getNumericScoreInput(e.target);
					if (Number(input.value) === value) {
						resolve();
					} else {
						reject(`Expecting value to equal ${value}`);
					}
				});
				const score = getNumericScore(el);
				const input = getNumericScoreInput(el);
				input.setAttribute('value', value);
				score._onGradeChange({ target: input });
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('letter score changed', async function() {
		return new Promise((resolve, reject) => {
			fixture(componentLetterScore).then(el => {
				const event = 'd2l-grade-result-letter-score-selected';
				const value = 'B';
				el.addEventListener(event, (e) => {
					const score = getLetterScoreSelect(e.target);
					if (score.value === value) {
						resolve();
					} else {
						reject(`Expecting value to equal ${value}`);
					}
				});
				const score = getLetterScore(el);
				const select = getLetterScoreSelect(el);
				select.value = value;
				score._onOptionSelected({ target: select });
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});
});
