import { d2lfetch } from 'd2l-fetch/src/index.js';

export class BaseController {
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

	_getActionByName(actions, name) {
		if (!actions) {
			throw new Error('No actions found');
		}

		if (!name) {
			throw new Error('Must provide a name for action');
		}

		const action = actions.find(action => action.name === name);

		if (!action) {
			throw new Error(`Action with name ${name} was not found.`);
		}

		return action;
	}

	_getFieldByName(fields, name) {
		if (!fields) {
			throw new Error('no fields found');
		}

		if (!name) {
			throw new Error('Must provide a name for action');
		}

		const field = fields.find(field => field.name === name);

		if (!field) {
			throw new Error(`Field with name ${name} was not found.`);
		}

		return field;
	}
}
