const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const loginData = require('./login.json');
const programVersionData = require('./programVersion.json');
const programVersionAllStatusData = require('./programVersionAllStatus.json');
const programVersionProgramsData = require('./programVersionPrograms.json');
const profileData = require('./profile.json');
const profileImageData = require('./profileImage.json');
const scholarsData = require('./scholars.json');
const candidatesData = require('./candidates.json');

server.use(middlewares);

let userSessionActive = false;

server.use(
	jsonServer.rewriter({
		'/api/v1/scholars': '/scholars',
		'/api/v1/applicants-types': '/applicants-types',
		'/api/v1/status-type': '/status-type',
	})
);

const buildResponse = (data, message, pagination = false, sort = null) => {
	const response = {
		data: data,
		error: null,
		message: message,
		success: true,
	};

	if (pagination) {
		response.pagination = {
			currentPage: 1,
			hasNextPage: false,
			hasPreviousPage: false,
			nextPageNumber: null,
			pageSize: 10,
			previousPageNumber: null,
			totalCount: data.length,
			totalPages: 1,
			filterOption: null,
			filterValue: null,
			criteria: null,
			sort: sort,
		};
	}

	return response;
};

const applicantsTypes = [
	{
		"id": 1,
		"name": "Candidate"
	},
	{
		"id": 2,
		"name": "Scholar"
	},
	{
		"id": 3,
		"name": "Intern"
	}
];

const statusTypes = [
	{
		id: 1,
		name: "Active"
	},
	{
		id: 3,
		name: "Inactive"
	},
	{
		id: 4,
		name: "OnHold"
	}
];
const applicants = [
	{
		id: '11221111-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Marcos Armendia',
			personalEmail: 'marcos.armendia@gmail.com',
			currentCity: 'Tarija',
			phoneNumber: '77777888',
		},
		enrollDate: null,
		endDate: null,
		programVersionName: null,
		programVersionId: '00000000-0000-0000-0000-000000000000',
		statusTypeId: 4,
		academicDegree: 'Graduate',
		career: 'Sistemas',
		institutionalEmail: 'eliot.fuentes@fundacion-jala.org',
		university: 'UMSS',
		applicantsType: 'Candidate',
	},
	{
		id: '11221118-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Sofia Perez',
			personalEmail: 'sofia.perez@gmail.com',
			currentCity: 'Santa Cruz',
			phoneNumber: '77777999',
		},
		enrollDate: '2020-01-17T00:00:00.0000000Z',
		endDate: null,
		programVersionName: 'Dev29',
		programVersionId: '4fffc534-1d83-12d5-b264-1e17f2abd322',
		statusTypeId: 4,
		academicDegree: '7thSemester',
		career: 'Sistemas',
		institutionalEmail: 'miguel.villanueva@fundacion-jala.org',
		university: 'Univalle',
		applicantsType: 'Candidate',
	},
	{
		id: '11111119-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Jorge Delgadillo Mamani',
			personalEmail: 'michael.jackson@gmail.com',
			currentCity: 'Potosi',
			phoneNumber: '77676767',
		},
		enrollDate: '2020-01-17T00:00:00.0000000Z',
		endDate: null,
		programVersionName: 'DEV31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 1,
		academicDegree: 'Graduate',
		career: 'Sistemas',
		institutionalEmail: 'eliot.fuentes@fundacion-jala.org',
		university: 'Univalle',
		applicantsType: 'Scholar',
	},
	{
		id: '11111120-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Cristhian Ortiz Quispe',
			personalEmail: 'juanita@gmail.com',
			currentCity: 'Cochabamba',
			phoneNumber: '78786555',
		},
		enrollDate: '2020-01-17T00:00:00.0000000Z',
		endDate: null,
		programVersionName: 'AT31',
		programVersionId: '3fffc534-1d83-34d5-b264-1e17f2abd322',
		statusTypeId: 1,
		academicDegree: 'Graduate',
		career: 'Informatica',
		institutionalEmail: 'eliot.fuentes@fundacion-jala.org',
		university: 'Saracho',
		applicantsType: 'Intern',
	},
	{
		id: '11111121-1d83-44d5-b264-1e17feabd322',
		person: {
			fullName: 'Maurcio Escocbar Smith',
			personalEmail: 'will@gmail.com',
			currentCity: 'Oruro',
			phoneNumber: '99886665',
		},
		enrollDate: '2020-01-17T00:00:00.0000000Z',
		endDate: null,
		programVersionName: 'DEV31',
		programVersionId: '4fffc534-1d83-14d5-b264-1e17f2abd322',
		statusTypeId: 3,
		academicDegree: '8th Semester',
		career: 'Redes',
		institutionalEmail: 'eliot.fuentes@fundacion-jala.org',
		university: 'UPDS',
		applicantsType: `Intern`,
	},
];

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	const baseURL = req.url.split('?')[0];
	const { filterField, filterValue, status } = req.query;

	console.log({
		baseURL,
		filterField,
		filterValue,
	});

	let scholarsData = applicants;

	if (userSessionActive || baseURL === '/api/v1/authentication/login') {
		switch (baseURL) {
			case '/api/v1/authentication/login':
				userSessionActive = true;
				response = buildResponse(loginData, 'OK');
				res.json(response);
				break;
			case '/api/v1/authentication/logout':
				userSessionActive = false;
				response = buildResponse(null, 'Logout successfully');
				res.json(response);
				break;
			case '/api/v1/users/profile':
				response = buildResponse(profileData, 'Success', true);
				res.json(response);
				break;
			case '/api/v1/image/c7a31196-87dd-4991-b04b-0e8faaea6ed2':
				response = buildResponse(profileImageData, 'Success', false);
				res.json(response);
				break;
			case '/api/v1/scholars':
				if (filterField && filterField !== '' && filterValue && filterValue !== '') {
					data = scholarsData.filter((scholar) => scholar[filterField].toLowerCase() == filterValue.toLowerCase());
				} else {
					data = scholarsData;
				}
				response = buildResponse(data, 'Success', true);
				res.json(response);
				break;
			case '/api/v1/applicants-types':
				res.json({
					message: "Success",
					error: null,
					data: applicantsTypes,
					success: true
				});
			case '/api/v1/status-type':
				res.json({
					message: "Success",
					error: null,
					data: statusTypes,
					success: true
				});
			case '/api/v1/program-versions':
				if (filterField && filterField !== '' && filterValue && filterValue !== '') {
					data = programVersionData.filter(
						(programVersion) => programVersion[filterField].toLowerCase() === filterValue.toLowerCase()
					);
				} else {
					data = programVersionData;
				}
				response = buildResponse(data, 'Success', true);
				res.json(response);
				break;
			case '/api/v1/program-versions/7345A111-FD04-45E6-DD2D-08D993FFADAC':
				res.json(programVersionData[0]);
				break;
			case '/api/v1/program-versions/5312E5E3-B032-449F-8566-911F9FA4AB8C':
				res.json(programVersionData[1]);
				break;
			case '/api/v1/program-versions/4fffc534-1d83-13d5-b264-1e17f2abd322':
				res.json(programVersionData[2]);
				break;
			case '/api/v1/program-versions/67dc7174-e25f-4702-b2cd-4cddb7b06fb6':
				res.json(programVersionData[3]);
				break;
			case '/api/v1/program-versions/2a239587-51ef-4cd4-8c29-e3b83e81b920':
				res.json(programVersionData[4]);
				break;		
			case '/api/v1/program-versions/86f37950-ed0f-4082-8c75-4245f3308b77':
				res.json(programVersionData[5]);
				break;		
			case '/api/v1/program-versions/b0df0773-4528-414c-9f82-e8c902231bc9':
				res.json(programVersionData[6]);
				break;	
			case '/api/v1/program-versions/2ce69f92-1d83-23d5-b264-1e17f2abd322':
				res.json(programVersionData[7]);
				break;
			case '/api/v1/program-versions/0860f3fc-4863-4868-ba58-0bd0d282115b':
				res.json(programVersionData[8]);
				break;						
			case '/api/v1/program-versions/f47c014a-7618-4569-b427-dc6bd60d487f':
				res.json(programVersionData[9]);
				break;						
			case '/api/v1/program-versions/status':
				if (status) {
					data = programVersionData.filter(
						(programVersion) => programVersion['status'] === status
					);
				} else {
					data = programVersionData;
				}
				response = buildResponse(data, 'Success', true);
				res.json(response);
				break;
			case '/api/v1/program-versions/allStatus':
				response = buildResponse(programVersionAllStatusData, 'Success', true);
				res.json(response);
				break;
			case '/api/v1/program-versions/programs':
				response = buildResponse(programVersionProgramsData, 'Success', true);
				res.json(response);
				break;

			case '/api/v1/candidates':
				response = buildResponse(candidatesData, 'Success', true);
				res.json(response);
				break;
		}
	} else {
		res.sendStatus(403);
	}
});

server.use(router);
server.listen(9000, () => {
	console.log('JSON Server is running');
});