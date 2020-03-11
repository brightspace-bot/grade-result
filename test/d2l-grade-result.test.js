import '../d2l-grade-result.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('d2l-labs-d2l-grade-result', () => {

	it('should pass all axe tests', async() => {
		const el = await fixture(html`<d2l-labs-d2l-grade-result></d2l-labs-d2l-grade-result>`);
		await expect(el).to.be.accessible();
	});

});
