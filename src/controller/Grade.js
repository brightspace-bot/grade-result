
export const GradeType = {
	Letter: 'LetterGrade',
	Number: 'Numeric'
};

export class Grade {
	constructor(scoreType, score, outOf, letterGrade, letterGradeOptions, entity) {
		this.entity = entity;
		this.scoreType = this._parseScoreType(scoreType);
		if (this.isNumberGrade()) {
			this._parseNumberGrade(score, outOf);
		} else {
			this._parseLetterGrade(letterGrade, letterGradeOptions);
		}
	}

	_parseScoreType(scoreType) {
		const invalidScoreError = new Error('Invalid scoreType given');

		if (!scoreType || typeof scoreType !== 'string') {
			throw invalidScoreError;
		}

		if (scoreType.toLowerCase() === GradeType.Number.toLowerCase()) {
			return GradeType.Number;
		} else if (scoreType.toLowerCase() === GradeType.Letter.toLowerCase()) {
			return GradeType.Letter;
		} else {
			throw invalidScoreError;
		}
	}

	_parseNumberGrade(score, outOf) {
		if ((!score && score !== 0) || isNaN(score)) {
			throw new Error('Invalid score provided');
		}

		if ((!outOf && outOf !== 0) || isNaN(outOf)) {
			throw new Error('Invalid outOf provided');
		}

		if (typeof score === 'string') {
			score = Number(score);
		}

		if (typeof outOf === 'string') {
			outOf = Number(outOf);
		}

		this.score = score;
		this.outOf = outOf;
		this.letterGrade = null;
		this.letterGradeOptions = null;
	}

	_parseLetterGrade(letterGrade, letterGradeOptions) {
		if (!letterGrade || typeof letterGrade !== 'string') {
			throw new Error('Invalid letterGrade provided');
		}

		if (!letterGradeOptions || !Array.isArray(letterGradeOptions) || letterGradeOptions.length === 0) {
			throw new Error('Invalid letterGradeOptions provided');
		}

		if (!letterGradeOptions.includes(letterGrade)) {
			throw new Error('letterGrade must be one of the letterGradeOptions provided');
		}

		this.score = null;
		this.outOf = null;
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
		return this.scoreType;
	}

	getScore() {
		return this.isNumberGrade() ? this.score : this.letterGrade;
	}

	getScoreOutOf() {
		return this.isNumberGrade() ? this.outOf : this.letterGradeOptions;
	}

	setScore(score) {
		if (this.isNumberGrade()) {
			this._parseNumberGrade(score, this.outOf);
		} else {
			this._parseLetterGrade(score, this.letterGradeOptions);
		}
	}

	getEntity() {
		return this.entity;
	}
}
