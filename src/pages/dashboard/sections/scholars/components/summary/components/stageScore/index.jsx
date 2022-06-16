import React, { useEffect } from 'react';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useParams } from 'react-router-dom';
import { Card, Feed, Icon, Progress } from 'semantic-ui-react';
import { EvaluationContextProvider } from 'pages/dashboard/sections/scholars/context/evaluation';
import { useApplication } from 'application/context/AppContext';
import RightSidebarEvaluationProfile from 'pages/dashboard/components/RightSidebarEvaluationProfile';
import './style.css';

/**
 * @returns {React.Component} -
 */
export default function StageScore() {
	const [state, actions] = useScholarDetailContext();
	const { id } = useParams();
	const [, appActions] = useApplication();

	useEffect(() => {
		actions.onGetStageScoreByScholar(id);
	}, []);

	const scoreColor = {
		1: 'one',
		2: 'two',
		3: 'three',
		4: 'four',
		5: 'five',
	};

	/**
	 *
	 * @param {object}item - Object with Data
	 */
	function handleModal(item) {
		appActions.onSidebarAddView({
			header: null,
			content: (
				<EvaluationContextProvider>
					<RightSidebarEvaluationProfile
						item={{
							scholarId: state.stageScore.scholarId,
							stageId: item.stageId,
							stageName: item.name,
						}}
					/>
				</EvaluationContextProvider>
			),
			footer: null,
			onHide: () => {
				appActions.onHideSidebar();
				appActions.onShareInformation({
					eventFormValues: {},
				});
			},
		});
	}

	if (state.stageScore) {
		return (
			<Card className='widget-stage'>
				<Card.Content>
					<Card.Header>
						<Icon name='tasks' />
						{state.stageScore.programVersion}
					</Card.Header>
					<Feed>
						{state.stageScore.stages.map((item, index) => (
							<Feed.Event key={index}>
								<Feed.Content>
									<div className='databar' onClick={() => handleModal(item)}>
										<Feed.Date content={item.name} />
										<Feed.Summary>
											<Progress
												progress='value'
												value={item.overallRating}
												total={5}
												className={scoreColor[item.overallRating]}
											/>
										</Feed.Summary>
									</div>
								</Feed.Content>
							</Feed.Event>
						))}
					</Feed>
				</Card.Content>
			</Card>
		);
	}

	return (
		<Card className='widget-stage'>
			<Card.Content>
				<Card.Header>
					<Icon name='tasks' />
					Stages
				</Card.Header>
				<Card.Content>
					<div>There are no resolved stages</div>
				</Card.Content>
			</Card.Content>
		</Card>
	);
}
