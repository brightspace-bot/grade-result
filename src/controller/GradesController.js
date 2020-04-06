import { BaseController } from './BaseController.js';
import { Grade } from './Grade.js';

export class Controller extends BaseController {
	constructor(baseHref, token) {
		super();
		this.baseHref = baseHref;
		this.token = token;
		this.saveGradeAction = undefined;
	}

	_parseProperties(properties) {
		const { scoreType, score, outOf, letterGrade, letterGradeOptions } = properties;
		return new Grade(scoreType, score, outOf, letterGrade, letterGradeOptions);
	}

	async requestGrade() {
		let ret = undefined;

		const response = await this._request(this.baseHref, 'GET');
		if (response) {
			if (response.properties) {
				ret = this._parseProperties(response.properties);
			}

			const action = this._getActionByName(response.actions, 'SaveGrade');
			if (action) {
				this.saveGradeAction = action;
			}
		}

		return ret;
	}

	async updateGrade(score) {
		if (!score) {
			throw new Error('Score must be provided to update a grade.');
		}

		if (!(score instanceof String)) {
			score = score.toString();
		}

		if (this.saveGradeAction) {
			const { href, method, fields } = this.saveGradeAction;
			const field = this._getFieldByName(fields, 'score');
			const response = await this._request(href, method, { [field.name]: score });
			if (response && response.properties) {
				return this._parseProperties(response.properties);
			} else {
				throw new Error('Unable to parse new grades object after update');
			}
		} else {
			throw new Error('this.saveGradeAction is not yet set.');
		}
	}
}
