import { ApiCore } from './core';
import { fileProvider } from './fileProvider';

export class FileApiCore extends ApiCore {
	constructor(options) {
		const { upload, ...rest } = options;
		super(rest);
		if (upload) {
			this.upload = (model, information, token = '', complement = '') => {
				return fileProvider.upload(
					rest.url,
					model,
					rest.service,
					information,
					complement,
					token
				);
			};
		}
	}
}
