import { apiProvider } from './provider';

export class ApiCore {
	constructor(options) {
		if (options.getAll) {
			this.getAll = (token = '', complement = '') => {
				return apiProvider.getAll(options.url, options.service, complement, token);
			};
		}

		if (options.getAllWithParams) {
			this.getAllWithParams = (params, token = '', complement = '') => {
				return apiProvider.getAllWithParams(
					options.url,
					params,
					options.service,
					complement,
					token
				);
			};
		}

		if (options.getSingle) {
			this.getSingle = (id, token = '') => {
				return apiProvider.getSingle(options.url, id, options.service, token);
			};
		}

		if (options.post) {
			this.post = (model, token = '', complement = '', optionsRequest) => {
				return apiProvider.post(
					options.url,
					model,
					options.service,
					complement,
					token,
					optionsRequest
				);
			};
		}

		if (options.put) {
			this.put = (model, token = '', complement = '', optionsRequest) => {
				return apiProvider.put(
					options.url,
					model,
					options.service,
					complement,
					token,
					optionsRequest
				);
			};
		}

		if (options.patch) {
			this.patch = (model, token = '', complement = '', optionsRequest) => {
				return apiProvider.patch(
					options.url,
					model,
					options.service,
					complement,
					token,
					optionsRequest
				);
			};
		}

		if (options.deleteSingle) {
			this.deleteSingle = (id, token = '') => {
				return apiProvider.deleteSingle(options.url, id, options.service, token);
			};
		}
	}
}
