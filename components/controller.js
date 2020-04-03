import { d2lfetch } from 'd2l-fetch/src/index.js';

export const GradeType = {
	Letter: 'LetterGrade',
	Number: 'Numeric'
};

export class Grade {
	constructor(outOf, scoreType, score, letterGrade, letterGradeOptions) {
		this.outOf = outOf;
		this.scoreType = scoreType;
		this.score = score;
		this.letterGrade = letterGrade;
		this.letterGradeOptions = letterGradeOptions;
	}

	isLetterGrade() {
		return this.scoreType === GradeType.Letter;
	}

	isNumberGrade() {
		return this.scoreType === GradeType.Number;
	}

	getScoreType() {
		if (this.isNumberGrade()) return GradeType.Number;
		if (this.isLetterGrade()) return GradeType.Letter;
		throw new Error('Invalid Grade Type found.');
	}

	getScore() {
		if (this.isNumberGrade() && this.score) {
			return this.score;
		} else if (this.isLetterGrade() && this.letterGrade) {
			return this.letterGrade;
		} else {
			throw new Error('Unable to parse the score.');
		}
	}

	getScoreOutOf() {
		if (this.isNumberGrade() && this.outOf) {
			return this.outOf;
		} else if (this.isLetterGrade() && this.letterGradeOptions) {
			return this.letterGradeOptions;
		} else {
			throw new Error('Unable to parse the score outOf.');
		}
	}
}

export class Controller {
	constructor(baseHref, token) {
		this.baseHref = baseHref;
		this.token = token;
		this.saveGradeAction = undefined;
	}

	async _request(href, method, body = undefined) {
		const options = {
			method,
			cors: 'no-cors',
			headers: {
				Authorization: `Bearer ${this.token}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		};

		if (body) {
			const data = new URLSearchParams();
			for (const key in body) {
				data.append(key, body[key]);
			}
			Object.assign(options, { body: data });
		}

		const request = new Request(href, options);
		// console.log('request', href, options);
		const response = await d2lfetch.fetch(request);
		// console.log('response', response);
		const json = await response.json();
		// console.log('json', json);
		return json;
	}

	_parseProperties(properties) {
		const { outOf, scoreType, score, letterGrade, letterGradeOptions } = properties;
		return new Grade(outOf, scoreType, score, letterGrade, letterGradeOptions);
	}

	async requestGrade() {
		let ret = undefined;

		const response = await this._request(this.baseHref, 'GET');
		if (response) {
			if (response.properties) {
				ret = this._parseProperties(response.properties);
			}

			if (response.actions) {
				const actions = response.actions.filter(action => action.name === 'SaveGrade');
				if (actions.length === 1) {
					this.saveGradeAction = actions[0];
				}
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

		const { href, method } = this.saveGradeAction;
		const field = this.saveGradeAction.fields[0].name;
		const response = await this._request(href, method, { [field]: score });
		if (response && response.properties) {
			return this._parseProperties(response.properties);
		} else {
			throw new Error('Unable to parse new grades object after update');
		}
	}
}
