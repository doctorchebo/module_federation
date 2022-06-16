import { enumServices } from 'api/utilities/enumServices';
import { FileApiCore } from '../utilities/fileApiCore';

const url = 'attachments';
const attachmentsApi = new FileApiCore({
	getSingle: true,
	upload: true,
	deleteSingle: true,
	url,
	service: enumServices.Attachments,
});

export default attachmentsApi;
