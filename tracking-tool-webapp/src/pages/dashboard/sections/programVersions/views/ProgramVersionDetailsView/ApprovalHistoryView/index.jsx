import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Icon, Button, Dimmer, Loader } from 'semantic-ui-react';
import ExportExcel from 'react-export-excel';
import { Link } from 'react-router-dom';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	ArcElement,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';
import { useApprovalHistoryContext } from '../../../context/approvalHistory';
import locale from '../../ProgramVersionDetailsView/locale/en.json';
import ApprovalHistoryTable from 'pages/dashboard/components/approval.history.table';
import './styles.css';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * @returns {React.Component} - Component for Approval History View.
 */
function ApprovalHistoryView() {
	const [state, actions] = useApprovalHistoryContext();
	const { id } = useParams();

	useEffect(() => {
		actions.onLoadProgramVersion(id);
		actions.onLoadActivitiesByProgramVersion(id);
	}, [id]);

	useEffect(() => {
		const activities = state.activities;
		if (activities && activities.length > 0) {
			const postulationActivity = activities[1];
			const infoTalkActivity = activities[2];
			actions.onLoadInfoTalksFailed(infoTalkActivity.id);
			actions.onLoadInfoTalksApproved(infoTalkActivity.id);
			actions.onLoadInfoTalksInProgress(infoTalkActivity.id);
			actions.onLoadPostulationsApproved(postulationActivity.id);
			actions.onLoadPostulationsFailed(postulationActivity.id);
			actions.onLoadPostulationsInProgress(postulationActivity.id);
		}
	}, [state.activities]);

	const setSimpleDate = (date) => {
		if (date) {
			date = date.split('T')[0];
			let formatDate = new Date(date);
			const month = locale.months[formatDate.getMonth()];
			date = `${month} ${formatDate.getUTCDate()}, ${formatDate.getFullYear()}`;
		}
		return date;
	};
	const ExcelFile = ExportExcel.ExcelFile;
	const ExcelSheet = ExportExcel.ExcelSheet;
	const ExcelColum = ExportExcel.ExcelColum;
	const {
		infTalkApproved,
		infTalkFailed,
		infTalkInProgress,
		postulantsApproved,
		postulantsFailed,
		postulantsInProgress,
	} = state;
	const labels = [locale.postulation, locale.informative_talk];
	const data = {
		labels,
		datasets: [
			{
				label: locale.inProgress,
				data: [postulantsInProgress.length, infTalkInProgress.length],
				backgroundColor: '#58B2F2 ',
			},
			{
				label: locale.failed,
				data: [postulantsFailed.length, infTalkFailed.length],
				backgroundColor: '#F87171',
			},
			{
				label: locale.approved,
				data: [postulantsApproved.length, infTalkApproved.length],
				backgroundColor: '#06D59F',
			},
		],
	};
	const options = {
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: locale.candidates,
			},
		},
	};
	const approvalHistoryData = [
		{
			activity: locale.postulation,
			entered:
				postulantsFailed.length + postulantsApproved.length + postulantsInProgress.length,
			inProgress: postulantsInProgress.length,
			failed: postulantsFailed.length,
			approved: postulantsApproved.length,
		},
		{
			activity: locale.informative_talk,
			entered: infTalkFailed.length + infTalkApproved.length + infTalkInProgress.length,
			inProgress: infTalkInProgress.length,
			failed: infTalkFailed.length,
			approved: infTalkApproved.length,
		},
		{
			activity: '',
			entered: locale.total,
			inProgress: infTalkInProgress.length + postulantsInProgress.length,
			failed: infTalkFailed.length + postulantsFailed.length,
			approved: infTalkApproved.length,
		},
	];

	return (
		<div className='approval-history'>
			<Dimmer inverted active={state.loading}>
				<Loader />
			</Dimmer>
			<div className='header' id='header'>
				<div className='sub-header'>
					<h1 className='title program-title'>
						<Link
							key='path'
							to='/dashboard/program-versions/'
							className='program-title-link'
						>
							{locale.programs}
						</Link>
						<Link
							key='path'
							to={`/dashboard/program-versions/${id}`}
							className='program-version-tittle'
						>
							{state.programVersion.name}
						</Link>
						<span className='title history-title program-title'>
							<b> {'>'} </b>
							{locale.approvalHistory}
						</span>
					</h1>
					<div className='export-buttons'>
						<ExcelFile
							element={
								<Button>
									<Icon name='file excel'></Icon>
									{locale.exportToExcel}
								</Button>
							}
							filename={locale.approvalHistory}
						>
							<ExcelSheet data={approvalHistoryData} name={locale.sheetName}>
								<ExcelColum label={locale.activity} value={locale.activity} />
								<ExcelColum label={locale.entered} value={locale.entered} />
								<ExcelColum label={locale.inProgress} value={locale.inProgress} />
								<ExcelColum label={locale.failed} value={locale.failed} />
								<ExcelColum label={locale.approved} value={locale.approved} />
							</ExcelSheet>
						</ExcelFile>
						<CSVLink data={approvalHistoryData} filename={locale.fileName}>
							<Button className='btn btn-success'>
								<Icon name='file excel outline'></Icon>
								{locale.exportToCsv}
							</Button>
						</CSVLink>
					</div>
				</div>
				<h3 className='coordinator'>
					<b>{locale.coordinator}:</b> {state.programVersion.coordinator?.firstName}
					{' ' + state.programVersion.coordinator?.lastName}
				</h3>
				<h3 className='duration'>
					<b>{locale.duration}: </b>
					<span className='start-date'>
						{setSimpleDate(state.programVersion.startDate)}
					</span>
					<span className='end-date'>
						<b> to</b> {setSimpleDate(state.programVersion.endDate)}
					</span>
				</h3>
			</div>
			<div className='table-approval-history'>
				<ApprovalHistoryTable data={approvalHistoryData} />
				<div className='candidates-graph'>
					<Bar className='bar-graph' data={data} options={options} />
				</div>
			</div>
		</div>
	);
}

export default ApprovalHistoryView;
