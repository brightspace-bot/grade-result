/* eslint-disable prefer-arrow-callback */
import '../d2l-grade-result.js';
import '../components/d2l-grade-result-presentational.js';
import { expect, fixture, html } from '@open-wc/testing';

const component = html`
	<d2l-labs-d2l-grade-result-presentational
		gradeType="number"
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
	return el
		.shadowRoot.querySelector('d2l-grade-result-manual-override-button')
		.shadowRoot.querySelector('d2l-button-subtle');
};

describe('d2l-labs-d2l-grade-result', () => {
	it('should pass all axe tests', async function() {
		const el = await fixture(html`<d2l-labs-d2l-grade-result></d2l-labs-d2l-grade-result>`);
		await expect(el).to.be.accessible();
	});

	it('click grade button event', async function() {
		return new Promise((resolve, reject) => {
			fixture(component).then(el => {
				const event = 'd2l-grade-result-grade-button-click';
				el.addEventListener(event, resolve);
				getGradesButton(el).click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('click reports button event', async function() {
		return new Promise((resolve, reject) => {
			fixture(component).then(el => {
				const event = 'd2l-grade-result-reports-button-click';
				el.addEventListener(event, resolve);
				getReportsButton(el).click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

	it('click manual override button click', async function() {
		return new Promise((resolve, reject) => {
			fixture(component).then(el => {
				const event = 'd2l-grade-result-manual-override-button-manual-override-click';
				el.addEventListener(event, resolve);
				const button = getManualOverrideButton(el);
				console.log(button);
				button.click();
				setTimeout(() => reject(`timeout waiting for ${event} event`), eventTimeoutMS);
			});
		});
	});

});

// manual override click
// type: "d2l-grade-result-manual-override-button-manual-override-click"

// manaul override clear click
// type: "d2l-grade-result-manual-override-button-manual-override-clear-click"

// letter score changed
// type: "d2l-grade-result-letter-score-selected"
// detail: {option: "B"}

// number grade changed
// type: "d2l-grade-result-grade-change"
// detail: {value: "4"}
