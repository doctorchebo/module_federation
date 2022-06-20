import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'scholars/evaluation-summary';

const evaluationScholarsApi = new ApiCore({
	getSingle: true,
	url: url,
	service: enumServices.MainService,
});

export default evaluationScholarsApi;
