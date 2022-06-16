import React from 'react';
import { Container, Grid, Header, Divider } from 'semantic-ui-react';
import ProgramElement from 'pages/home/components/ProgramElement';
import PropTypes from 'prop-types';
import './style.css';

/**
 * @param {object} props -
 * @returns {object} -Formating program component
 */
export default function FormationPrograms(props) {
	const { programs, title } = props;
	const programsItems = programs.map((program, iterator) => {
		return (
			<Grid.Column key={iterator}>
				<ProgramElement img={program.img} text={program.text} />
			</Grid.Column>
		);
	});
	return (
		<Container className='formationPrograms_section' fluid>
			<Grid textAlign='center'>
				<Header
					inverted
					as='h1'
					content={title}
					className='main-title formationPrograms_title'
				/>
			</Grid>
			<Divider />
			<Grid textAlign='center'>
				<Grid.Row columns={4}>{programsItems}</Grid.Row>
			</Grid>
		</Container>
	);
}

FormationPrograms.propTypes = { programs: PropTypes.array, title: PropTypes.string };
