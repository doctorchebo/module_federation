import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { Report } from 'helpers/iconTypes';
import ImportHeader from '../importHeader';
import ReportMessage from '../reportMessage';
import TotalReport from '../totalReport';
import Locale from './locale/en.json';
import Button from 'components/button';

/**
 * Report view (Summary) for file importation
 *
 * @param {*} props Properties and functions
 * @returns {React.Component} Render a React component
 */
export default function UploadReports(props) {
	const { reports, onClose, onReset, title } = props;

	let totalSuccess = 0;
	reports.data.forEach((element) => {
		totalSuccess += element.totalSuccess;
	});
	let totalErrors = 0;
	reports.data.forEach((element) => {
		totalErrors += element.totalError;
	});
	const message = reports.data
		.filter((item) => item.totalError > 0)
		.map((item, index) => {
			return (
				<ReportMessage
					key={index}
					dataErrors={item.dataErrors}
					status={item.status}
					fileName={item.fileName}
				/>
			);
		});
	const handleClose = () => {
		onReset();
		onClose();
	};
	return (
		<Segment className='uploadComponent' basic>
			<Button compact size={'tiny'} className='back-btn' onClick={handleClose}>
				{`${Locale.backButton}${title}`}
			</Button>
			<ImportHeader title={`${Locale.importTitle}${title}`} subTitle={Locale.description} />
			<Segment basic>
				<TotalReport
					icon={Report.success}
					message={`${totalSuccess} ${title} ${Locale.successSufix}`}
					extra=''
				/>
				<TotalReport
					icon={Report.failed}
					message={`${totalErrors} ${title} ${Locale.errorSufix}`}
					extra={Locale.errorSuggestion}
				/>
			</Segment>
			<Segment basic padded='very'>
				{message}
			</Segment>
		</Segment>
	);
}
UploadReports.propTypes = {
	reports: PropTypes.object,
	onClose: PropTypes.func,
	onReset: PropTypes.func,
	title: PropTypes.string,
};
