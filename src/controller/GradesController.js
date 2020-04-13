import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import { Grade } from './Grade.js';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

export class GradesController {
	constructor(baseHref, token) {
		if (!baseHref) {
			throw new Error('baseHref was not defined when initializing GradesController');
		}

		if (!token) {
			throw new Error('token was not defined when initializing GradesController');
		}

		this.baseHref = baseHref;
		this.token = token;
		this.saveGradeAction = undefined;
	}

	_parseGrade(entity) {
		if (!entity.properties) {
			throw new Error('Entity does not have properties attached to it.');
		}

		return new Grade(
			entity.properties.scoreType,
			entity.properties.score,
			entity.properties.outOf,
			entity.properties.letterGrade,
			entity.properties.letterGradeOptions
		);
	}

	_parseSaveGradeAction(entity) {
		const actionName = 'SaveGrade';

		if (!entity.hasActionByName(actionName)) {
			throw new Error('Could not find the SaveGrade action from entity.');
		}

		this.saveGradeAction = entity.getActionByName(actionName);
	}

	async requestGrade() {
		const response = await window.D2L.Siren.EntityStore.fetch(this.baseHref, this.token, true);
		if (!response) {
			throw new Error('request for grade failed');
		}
		if (!response.entity) {
			throw new Error('entity not found for requestGrade');
		}
		this._parseSaveGradeAction(response.entity);
		return this._parseGrade(response.entity);
	}

	async updateGrade(score) {
		if (!score) {
			throw new Error('Score must be provided to update a grade.');
		}

		if (!this.saveGradeAction) {
			throw new Error('SaveGrade action is not yet set. You must successfully call requestGrade before updateGrade.');
		}

		if (!(score instanceof String)) {
			score = score.toString();
		}

		const fieldName = 'score';

		if (!this.saveGradeAction.hasFieldByName(fieldName)) {
			throw new Error(`Expected the ${this.saveGradeAction.name} action to have a ${fieldName} field.`);
		}

		const field = this.saveGradeAction.getFieldByName(fieldName);
		field.value = score;

		const newGrade = await performSirenAction(this.token, this.saveGradeAction, [field], true);
		return this._parseGrade(newGrade);
	}
}
