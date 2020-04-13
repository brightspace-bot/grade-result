
export const GradeType = {
	Letter: 'LetterGrade',
	Number: 'Numeric'
};

export class Grade {
	constructor(scoreType, score, outOf, letterGrade, letterGradeOptions) {

		if (scoreType !== GradeType.Number && scoreType !== GradeType.Letter) {
			const invalidScoreError = new Error('Invalid scoreType given');
			if (typeof scoreType === 'string') {
				const compare = type => type.toLowerCase() === scoreType.toLowerCase();
				const found = Object.values(GradeType).find(compare);
				if (found === undefined) {
					throw invalidScoreError;
				} else {
					scoreType = found;
				}
			} else {
				throw invalidScoreError;
			}
		}

		this.scoreType = scoreType;

		if (this.isNumberGrade()) {
			if ((!score && score !== 0) || isNaN(score)) {
				throw new Error('Invalid score provided');
			}

			if ((!outOf && outOf !== 0) || isNaN(outOf)) {
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

			if (letterGradeOptions.find(option => option === letterGrade) === undefined) {
				throw new Error('letterGrade must be one of the letterGradeOptions provided');
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
		return this.scoreType;
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
