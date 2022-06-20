import React from 'react';
import { Form as SForm, Button as SButton } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { array, func, object } from 'prop-types';
import CustomTableHeader from 'components/customTableHeader';
import useForm, {
	FormGroup,
	FormControl,
	FormComponent as Form,
	FieldComponent as Field,
} from 'hooks/useForm';
import { isEmpty } from 'helpers/validators';
import Noop from 'helpers/Noop';
import './styles.css';

/**
 * Renders the content of RightSidebar when works with settings grade
 *
 * @param {object} props - properties
 * @returns {React.Component} - RightSidebar Grade Form content
 */
export default function GradeForm(props) {
	const { formOptions, gradeTypes, onCancel, headers, onSubmit } = props;
	const formGroup = gradeTypes.reduce(
		(previusGrade, currentGrade) => ({
			...previusGrade,
			[currentGrade.id]: new FormControl(currentGrade.color),
		}),
		{}
	);

	const formGroupBuilder = useForm(new FormGroup(formGroup));
	const { controls } = formGroupBuilder;
	return (
		<>
			<Form
				as={SForm}
				loading={isEmpty(gradeTypes.length)}
				onSubmit={onSubmit}
				formGroupBuilder={formGroupBuilder}
			>
				<Table className='table-user table-container'>
					<CustomTableHeader headers={headers} type={'settings'} />
					<Table.Body>
						{gradeTypes.map((grade, index) => {
							const { id, color, name } = grade;
							return (
								<Table.Row key={id - index}>
									<Table.Cell className='cell-content'>
										<span key={name} className='grade-name'>
											{name}
										</span>
									</Table.Cell>
									<Table.Cell className='cell-content'>
										<Field
											className='grade-content'
											type='color'
											key={id}
											as={SForm.Input}
											formControlName={id}
										/>
									</Table.Cell>
									<Table.Cell className='cell-content'>
										<span key={color} className='grade-content'>
											{controls[id].value}
										</span>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
				<SButton.Group key='button-group' className='btn-group' floated='right'>
					<SButton
						key='button-cancel'
						basic
						onClick={onCancel}
						content={formOptions.cancel}
					/>
					<SButton key='button-submit' primary type='submit' content={formOptions.save} />
				</SButton.Group>
			</Form>
		</>
	);
}

GradeForm.propTypes = {
	formOptions: object,
	gradeTypes: array,
	onCancel: func,
	headers: array,
	onSubmit: func,
};

GradeForm.defaultProps = {
	onCancel: Noop,
	onSubmit: Noop,
	gradeTypes: [],
	headers: [],
};
