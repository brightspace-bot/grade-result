import { d2lfetch } from 'd2l-fetch/src/index.js';

async function test() {
	const url = 'https://648df3aa-e573-4c44-b34b-856c0523e9d5.activities.api.proddev.d2l/activities/6606_3000_2/usages/6609/users/178/grade';
	const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjU1MzljMTg0LTIzNTktNGQ2OC04OGU4LTQ5Y2E0ODYwZTZkMiJ9.eyJzdWIiOiIxNzciLCJ0ZW5hbnRpZCI6IjY0OGRmM2FhLWU1NzMtNGM0NC1iMzRiLTg1NmMwNTIzZTlkNSIsInNjb3BlIjoiKjoqOioiLCJqdGkiOiIxN2I5N2MxYi1kMWRmLTRmMTctYmY1ZS0xZjllMzdkYmE4ZDQiLCJpc3MiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aCIsImF1ZCI6Imh0dHBzOi8vYXBpLmJyaWdodHNwYWNlLmNvbS9hdXRoL3Rva2VuIiwiZXhwIjoxNTg1Njc1MzM0LCJuYmYiOjE1ODU2NzE3MzR9.jYzGMtXjPkn5S0KkTb_0UYVzL0jkwljEnc5MxX3nB_vxwrv35lzT3s7Uyi6qJPsjbmzOBw2gbEDihV6g4teDjRZBxNG8ZuRbwjC4juoAUP5BFeF1vlz7c3fxIS_5IeAv6OXXrMGd2UOFF_KdFQljOlQ4ceehIJwP6og-vGnWPOprkFnV3iC70tENp4oilpuBnfGh35h0-v_gPfy_DyFSgrcdBCOKvpVr2KsMXlF-qug6b2fs1FS9GR6G1G77vlUQ8mfXpb59xh_FF0cAOIk2TbH0Ry0vrBR8C7mjVew9lK0FJWMSVO8SmFvr4RRwXalRa7032P0o69VJuGcxrDD1Ig';
	console.log(url, token);
	const response = await request(url, 'GET', token);
	console.log(response);
	const { outOf, scoreType, score, letterGrade, letterGradeOptions } = response.properties;
	console.log(outOf);
	console.log(scoreType);
	console.log(score);
	console.log(letterGrade);
	console.log(letterGradeOptions);

	const action = response.actions.filter(action => action.name === 'SaveGrade')[0];
	console.log(action);
	saveGrade(action, token, '50');
}

async function saveGrade(action, token, score) {
	const { href, method } = action;
	const field = action.fields[0].name;
	await request(href, method, token, { [field]: score });
}

async function request(href, method, token, body = undefined) {
	const options = {
		method,
		cors: 'no-cors',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	};

	if (body) {
		Object.assign(options, { body });
	}
	console.log(options);

	const request = new Request(href, options);
	const response = await d2lfetch.fetch(request);
	return await response.json();
}

test();
