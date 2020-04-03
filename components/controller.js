import { d2lfetch } from 'd2l-fetch/src/index.js';

export const GradeType = {
	Letter: 'LetterGrade',
	Number: 'Numeric'
};

export class Grade {
	constructor(scoreType, score, outOf, letterGrade, letterGradeOptions) {

		if (scoreType !== GradeType.Number && scoreType !== GradeType.Letter) {
			throw new Error('Invalid scoreType given');
		}

		this.scoreType = scoreType;

		if (this.isNumberGrade()) {
			if (!score || isNaN(score)) {
				throw new Error('Invalid score provided');
			}

			if (!outOf || isNaN(outOf)) {
				throw new Error('Invalid outOf provided');
			}

			this.score = score;
			this.outOf = outOf;
			this.letterGrade = null;
			this.letterGradeOptions = null;
		} else {
			if (!letterGrade || typeof letterGrade !== 'string') {
				throw new Error('Invalid letterGrade provided');
			}

			if (!letterGradeOptions || !(letterGradeOptions instanceof Array) || Object.keys(letterGradeOptions).length === 0) {
				throw new Error('Invalid letterGradeOptions provided');
			}

			this.score = null;
			this.outOf = null;
			this.letterGrade = letterGrade;
			this.letterGradeOptions = letterGradeOptions;
		}
	}

	isLetterGrade() {
		return this.scoreType === GradeType.Letter;
	}

	isNumberGrade() {
		return this.scoreType === GradeType.Number;
	}

	getScoreType() {
		return this.isNumberGrade() ? GradeType.Number : GradeType.Letter;
	}

	getScore() {
		if (this.isNumberGrade() && this.score) {
			return this.score;
		} else if (this.isLetterGrade() && this.letterGrade) {
			return this.letterGrade;
		} else {
			throw new Error('Unable to parse the score');
		}
	}

	getScoreOutOf() {
		if (this.isNumberGrade() && this.outOf) {
			return this.outOf;
		} else if (this.isLetterGrade() && this.letterGradeOptions) {
			return this.letterGradeOptions;
		} else {
			throw new Error('Unable to parse the score outOf');
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
		const response = await d2lfetch.fetch(request);
		const json = await response.json();
		return json;
	}

	_parseProperties(properties) {
		const { outOf, scoreType, score, letterGrade, letterGradeOptions } = properties;
		return new Grade(scoreType, score, outOf, letterGrade, letterGradeOptions);
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
