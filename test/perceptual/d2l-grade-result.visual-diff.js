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

	const testVisualDifference = async(id) => {
		const rect = await visualDiff.getRect(page, id);
		const title = this.test.fullTitle();
		await visualDiff.screenshotAndCompare(page, title, { clip: rect });
	};

	it('d2l-labs-d2l-grade-result', async() => {
		testVisualDifference('#d2l-labs-d2l-grade-result');
	});

	it('write-enabled-number-grade-basic-no-icons', async() => {
		testVisualDifference('#write-enabled-number-grade-basic-no-icons');
	});

	it('write-enabled-number-grade-basic-icons', async() => {
		testVisualDifference('#write-enabled-number-grade-basic-icons');
	});

	it('write-enabled-number-grade-basic-icons-tooltips', async() => {
		testVisualDifference('#write-enabled-number-grade-basic-icons-tooltips');
	});

	it('write-enabled-letter-grade-basic-no-icons', async() => {
		testVisualDifference('#write-enabled-letter-grade-basic-no-icons');
	});

	it('write-enabled-letter-grade-basic-icons', async() => {
		testVisualDifference('#write-enabled-letter-grade-basic-icons');
	});

	it('write-enabled-letter-grade-basic-icons-tooltips', async() => {
		testVisualDifference('#write-enabled-letter-grade-basic-icons-tooltips');
	});

});
