/* eslint-disable prefer-arrow-callback */
const puppeteer = require('puppeteer');
const VisualDiff = require('@brightspace-ui/visual-diff');

describe('d2l-labs-d2l-grade-result', () => {

	const visualDiff = new VisualDiff('d2l-grade-result', __dirname);

	let browser, page;

	before(async() => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.setViewport({width: 800, height: 800, deviceScaleFactor: 2});
		await page.goto(`${visualDiff.getBaseUrl()}/test/perceptual/d2l-grade-result.visual-diff.html`, {waitUntil: ['networkidle0', 'load']});
		await page.bringToFront();
	});

	beforeEach(async() => {
		await visualDiff.resetFocus(page);
	});

	after(() => browser.close());

	async function focusGradesButton(id) {
		await page.evaluate((id) => {
			document
				.querySelector(id)
				.querySelector('d2l-labs-d2l-grade-result-presentational')
				.shadowRoot.querySelector('d2l-grade-result-icon-button')
				.shadowRoot.querySelector('d2l-button-icon')
				.focus();
		}, id);
	}

	async function focusReportsButton(id) {
		await page.evaluate((id) => {
			document
				.querySelector(id)
				.querySelector('d2l-labs-d2l-grade-result-presentational')
				.shadowRoot.querySelectorAll('d2l-grade-result-icon-button')[1]
				.shadowRoot.querySelector('d2l-button-icon')
				.focus();
		}, id);
	}

	async function testDiff(id, fullTitle, focusGrades = false, focusReports = false) {
		const rect = await visualDiff.getRect(page, id);
		if (focusGrades) {
			await focusGradesButton(id);
		} else if (focusReports) {
			await focusReportsButton(id);
		}
		await visualDiff.screenshotAndCompare(page, fullTitle, { clip: rect });
	}

	/* --- WRITE ENABLED --- */

	it('write-enabled-number-grade-no-icons', async function() {
		await testDiff('#write-enabled-number-grade-no-icons', this.test.fullTitle());
	});

	it('write-enabled-number-grade-icons', async function() {
		await testDiff('#write-enabled-number-grade-icons', this.test.fullTitle());
	});

	it('write-enabled-number-grade-icons-tooltips-grade', async function() {
		await testDiff('#write-enabled-number-grade-icons-tooltips', this.test.fullTitle(), true);
	});

	it('write-enabled-number-grade-icons-tooltips-reports', async function() {
		await testDiff('#write-enabled-number-grade-icons-tooltips', this.test.fullTitle(), false, true);
	});

	it('write-enabled-letter-grade-no-icons', async function() {
		await testDiff('#write-enabled-letter-grade-no-icons', this.test.fullTitle());
	});

	it('write-enabled-letter-grade-icons', async function() {
		await testDiff('#write-enabled-letter-grade-icons', this.test.fullTitle());
	});

	it('write-enabled-letter-grade-icons-tooltips-grades', async function() {
		await testDiff('#write-enabled-letter-grade-icons-tooltips', this.test.fullTitle(), true);
	});

	it('write-enabled-letter-grade-icons-tooltips-reports', async function() {
		await testDiff('#write-enabled-letter-grade-icons-tooltips', this.test.fullTitle(), false, true);
	});

	/* --- READ ONLY --- */

	it('read-only-number-grade-no-icons', async function() {
		await testDiff('#read-only-number-grade-no-icons', this.test.fullTitle());
	});

	it('read-only-number-grade-icons', async function() {
		await testDiff('#read-only-number-grade-icons', this.test.fullTitle());
	});

	it('read-only-number-grade-icons-tooltips-grades', async function() {
		await testDiff('#read-only-number-grade-icons-tooltips', this.test.fullTitle(), true);
	});

	it('read-only-number-grade-icons-tooltips-reports', async function() {
		await testDiff('#read-only-number-grade-icons-tooltips', this.test.fullTitle(), false, true);
	});

	it('read-only-letter-grade-no-icons', async function() {
		await testDiff('#read-only-letter-grade-no-icons', this.test.fullTitle());
	});

	it('read-only-letter-grade-icons', async function() {
		await testDiff('#read-only-letter-grade-icons', this.test.fullTitle());
	});

	it('read-only-letter-grade-icons-tooltips-grades', async function() {
		await testDiff('#read-only-letter-grade-icons-tooltips', this.test.fullTitle(), true);
	});

	it('read-only-letter-grade-icons-tooltips-reports', async function() {
		await testDiff('#read-only-letter-grade-icons-tooltips', this.test.fullTitle(), false, true);
	});

	/* --- AUTOGRADE PROVIDED --- */

	it('autograde-provided-number-grade-no-icons-manual-override-option', async function() {
		await testDiff('#autograde-provided-number-grade-no-icons-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-number-grade-icons-manual-override-option', async function() {
		await testDiff('#autograde-provided-number-grade-icons-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-number-grade-icons-tooltips-manual-override-option-grades', async function() {
		await testDiff('#autograde-provided-number-grade-icons-tooltips-manual-override-option', this.test.fullTitle(), true);
	});

	it('autograde-provided-number-grade-icons-tooltips-manual-override-option-reports', async function() {
		await testDiff('#autograde-provided-number-grade-icons-tooltips-manual-override-option', this.test.fullTitle(), false, true);
	});

	it('autograde-provided-letter-grade-no-icons-manual-override-option', async function() {
		await testDiff('#autograde-provided-letter-grade-no-icons-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-letter-grade-icons-manual-override-option', async function() {
		await testDiff('#autograde-provided-letter-grade-icons-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-letter-grade-icons-tooltips-manual-override-option-grades', async function() {
		await testDiff('#autograde-provided-letter-grade-icons-tooltips-manual-override-option', this.test.fullTitle(), true);
	});

	it('autograde-provided-letter-grade-icons-tooltips-manual-override-option-reports', async function() {
		await testDiff('#autograde-provided-letter-grade-icons-tooltips-manual-override-option', this.test.fullTitle(), false, true);
	});

	it('autograde-provided-number-grade-no-icons-clear-manual-override-option', async function() {
		await testDiff('#autograde-provided-number-grade-no-icons-clear-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-number-grade-icons-clear-manual-override-option', async function() {
		await testDiff('#autograde-provided-number-grade-icons-clear-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-number-grade-icons-tooltips-clear-manual-override-option-grades', async function() {
		await testDiff('#autograde-provided-number-grade-icons-tooltips-clear-manual-override-option', this.test.fullTitle(), true);
	});

	it('autograde-provided-number-grade-icons-tooltips-clear-manual-override-option-reports', async function() {
		await testDiff('#autograde-provided-number-grade-icons-tooltips-clear-manual-override-option', this.test.fullTitle(), false, true);
	});

	it('autograde-provided-letter-grade-no-icons-clear-manual-override-option', async function() {
		await testDiff('#autograde-provided-letter-grade-no-icons-clear-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-letter-grade-icons-clear-manual-override-option', async function() {
		await testDiff('#autograde-provided-letter-grade-icons-clear-manual-override-option', this.test.fullTitle());
	});

	it('autograde-provided-letter-grade-icons-tooltips-clear-manual-override-option-grades', async function() {
		await testDiff('#autograde-provided-letter-grade-icons-tooltips-clear-manual-override-option', this.test.fullTitle(), true);
	});

	it('autograde-provided-letter-grade-icons-tooltips-clear-manual-override-option-reports', async function() {
		await testDiff('#autograde-provided-letter-grade-icons-tooltips-clear-manual-override-option', this.test.fullTitle(), false, true);
	});

});
