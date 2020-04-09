import { ActivityGradeEntity } from 'siren-sdk/src/activities/ActivityGradeEntity.js';
import { entityFactory } from 'siren-sdk/src/es6/EntityFactory.js';
// import { Grade } from './Grade.js';
// import SirenParse from 'siren-parser';

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
		this.isEntitySubscribed = false;
	}

	// _parseGrade(entity) {
	// 	if (!entity.properties) {
	// 		throw new Error('Entity does not have properties attached to it.');
	// 	}

	// 	return new Grade(
	// 		entity.properties.scoreType,
	// 		entity.properties.score,
	// 		entity.properties.outOf,
	// 		entity.properties.letterGrade,
	// 		entity.properties.letterGradeOptions
	// 	);
	// }

	// _parseSaveGradeAction(entity) {
	// 	const actionName = 'SaveGrade';

	// 	if (!entity.hasActionByName(actionName)) {
	// 		throw new Error('Could not find the SaveGrade action from entity.');
	// 	}

	// 	this.saveGradeAction = entity.getActionByName(actionName);
	// }

	requestGrade() {
		return new Promise((resolve, reject) => {
			entityFactory(ActivityGradeEntity, this.href, this.token, (entity, error) => {
				if (error) reject(error);
				resolve(entity);
			});
			setTimeout(() => reject('Request timed out'), 5000);
		});
	}

	// async updateGrade(score) {
	// 	if (!score) {
	// 		throw new Error('Score must be provided to update a grade.');
	// 	}

	// 	if (!this.saveGradeAction) {
	// 		throw new Error('SaveGrade action is not yet set. You must successfully call requestGrade before updateGrade.');
	// 	}

	// 	if (!(score instanceof String)) {
	// 		score = score.toString();
	// 	}

	// 	const fieldName = 'score';

	// 	if (!this.saveGradeAction.hasFieldByName(fieldName)) {
	// 		throw new Error(`Expected the ${this.saveGradeAction.name} action to have a ${fieldName} field.`);
	// 	}

	// 	const field = this.saveGradeAction.getFieldByName(fieldName);
	// 	const { href, method } = this.saveGradeAction;

	// 	const response = await this._request(href, method, { [field.name]: score });
	// 	const parsedEntity = SirenParse(response);
	// 	return this._parseGrade(parsedEntity);
	// }
}
