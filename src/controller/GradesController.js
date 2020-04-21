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
			entity.properties.letterGradeOptions,
			entity
		);
	}

	async requestGrade(bypassCache = false) {
		const response = await window.D2L.Siren.EntityStore.fetch(this.baseHref, this.token, bypassCache);
		if (!response) {
			throw new Error('request for grade failed');
		}
		if (!response.entity) {
			throw new Error('entity not found for requestGrade');
		}
		const entity = response.entity;
		const grade = this._parseGrade(entity);
		return grade;
	}

	async updateGrade(grade) {
		if (!grade) {
			throw new Error('grade must be provided to update a grade.');
		}
		const entity = grade.getEntity();
		if (!entity) {
			throw new Error('entity must be provided with the grade to update a grade.');
		}

		const actionName = 'SaveGrade';
		const fieldName = 'score';

		if (!entity.hasActionByName(actionName)) {
			throw new Error('Could not find the SaveGrade action from entity.');
		}

		const saveGradeAction = entity.getActionByName(actionName);

		if (!saveGradeAction.hasFieldByName(fieldName)) {
			throw new Error(`Expected the ${this.saveGradeAction.name} action to have a ${fieldName} field.`);
		}

		const field = saveGradeAction.getFieldByName(fieldName);
		field.value = grade.getScore();

		const newGradeEntity = await performSirenAction(this.token, saveGradeAction, [field], true);
		return this._parseGrade(newGradeEntity);
	}
}
