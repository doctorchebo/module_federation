import { Dimmer, Image, Loader } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import useForm, {
	FormGroup,
	FormControl,
	requiredValidator,
	FormComponent as Form,
	minLengthValidator,
	FieldComponent as Field,
} from 'hooks/useForm';
import SelectAdapter from 'components/form/selectAdapter';
import Button from 'components/button';
import SForm from 'components/form';
import Grid from 'components/grid';
import Message from 'components/message';
import Noop from 'helpers/Noop';
import RequiredDot from 'components/requiredDot';
import RichTextEditor from 'components/richText';
import SubjectsBulkScholarTable from '../subjects.bulk.scholar.table';
import localeSubject from '../eventsManager/locale/en.json';
import locale from '../../locale/en.json';
import EmptyContent from 'assets/img/empty-list.png';
import './index.css';

/**
 * Returns a Bulk Edit Form Component.
 *
 * @param {object} props - properties
 * @returns {React.Component} - Form component
 */
export default function SubjectsBulkForm(props) {
	const { title, loading, scholarSelected, onSelectScholar, onSubmit } = props;

	const [state, actions] = useSubjectDetailsContext();

	const { id } = useParams();

	const formGroupBuilder = useForm(
		new FormGroup({
			scholarsIds: new FormControl([]),
			grade: new FormControl(
				'',
				requiredValidator(localeSubject.errorMessagesSubject.grade.required)
			),
			comment: new FormControl(
				localeSubject.bulkEvaluation.comment.initialValue,
				requiredValidator(localeSubject.errorMessagesSubject.comment.required),
				minLengthValidator(
					localeSubject.bulkEvaluation.comment.minLength,
					localeSubject.errorMessagesSubject.comment.minLength.replace(
						'%s',
						localeSubject.bulkEvaluation.comment.minLength
					)
				)
			),
		})
	);

	const { controls } = formGroupBuilder;

	useEffect(() => {
		actions.onGetGrades();
	}, []);

	const validatorSelect = (value) => {
		onSelectScholar(value);
	};

	const subjectForm = localeSubject.subjectForm;

	/**
	 * This function get an error list.
	 *
	 * @param {{string: any}} errors These are errors from a FormGroup.
	 * @returns {Array} Returns an array of errors.
	 */
	function getErrorList(errors) {
		return Object.values(errors).filter((error) => error !== null);
	}

	const gradeError = controls.grade.hasErrors() && controls.grade.dirty;
	const commentError = controls.comment.hasErrors() && controls.comment.dirty;

	return (
		<>
			<div className='bulk-form'>
				<header className='section-header'>
					<span className='title'>{title}</span>
				</header>
				<Dimmer inverted active={state.loading}>
					<Loader />
				</Dimmer>
				<section>
					<Form as={SForm} formGroupBuilder={formGroupBuilder} onSubmit={onSubmit}>
						<Grid key='grid'>
							<Grid.Row key='grid-row'>
								<Grid.Column
									key='row-colum-roles-selector'
									className='role-selector-container'
									width='8'
								>
									{state.scholars.length > 0 ? (
										<SubjectsBulkScholarTable
											value={controls.scholarsIds.value}
											onSelect={validatorSelect}
										/>
									) : (
										<div className={'empty-content'}>
											<Image disabled src={EmptyContent} />
										</div>
									)}
								</Grid.Column>
								<Grid.Column
									key='row-colum-permissions'
									className='permissions-container'
									width='8'
									height='50%'
								>
									<Field
										style={{ width: '30%', minWidth: '30%' }}
										key='grade'
										as={SelectAdapter}
										formControlName='grade'
										label={
											<div className={'form-label'}>
												{subjectForm.fields.grade.label}
												<RequiredDot />
											</div>
										}
										placeholder={subjectForm.fields.grade.placeholder}
										options={state.grades || []}
										error={gradeError}
									/>
									<Message
										key='message-grade'
										error
										visible
										hidden={!gradeError}
										header={subjectForm.messageError.header}
										list={getErrorList(controls.grade.errors)}
									/>
									<Field
										key='comment'
										as={RichTextEditor}
										className='comment'
										formControlName='comment'
										label={
											<div className='label'>
												<div className={'form-label'}>
													{subjectForm.fields.comment.label}
													<RequiredDot />
												</div>
											</div>
										}
										placeholder={subjectForm.fields.comment.placeholder}
										error={commentError}
									/>
									<Message
										key='message-comment'
										error
										visible
										hidden={!commentError}
										header={subjectForm.messageError.header}
										list={getErrorList(controls.comment.errors)}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
						<div key='buttons-role' className='button-group'>
							<Button
								key='button-back'
								as={Link}
								compact
								content={locale.subjects.bulkEvaluationForm.cancel}
								className='button-back'
								to={`/dashboard/subjects/${id}`}
							/>
							<Button
								key='button-save'
								primary
								type='submit'
								content={locale.subjects.bulkEvaluationForm.save}
								disabled={!scholarSelected || controls['grade'].value === ''}
								loading={loading}
							/>
						</div>
					</Form>
				</section>
			</div>
		</>
	);
}

SubjectsBulkForm.propTypes = {
	title: PropTypes.string.isRequired,
	loading: PropTypes.bool,
	scholarSelected: PropTypes.bool,
	onSelectScholar: PropTypes.func,
	onSubmit: PropTypes.func,
};

SubjectsBulkForm.defaultProps = {
	title: '',
	loading: false,
	scholarSelected: false,
	onSelectScholar: Noop,
	onSubmit: Noop,
};
