export const sectionMock = {
	skillId: '111111fe-b5d2-47cb-9c21-f043ad49f5a9',
	name: 'Job Knowledge',
	score: 2,
	questions: [
		{
			questionId: '111111fe-b1d1-47cb-9c21-f043ad49f5a9',
			title: 'annie, are you okay?',
			answer: {
				optionSelectedId: '111111fe-b1d1-11cb-9c21-f043ad49f5a9',
				comment: 'need more pylons',
			},
			options: [
				{ id: '111111fe-b1d1-11cb-9c21-f043ad49f5a9', name: 'Poor', weight: 1 },
				{ id: '1322fe-b1d1-11cb-9c21-f043a0d49f5a9', name: 'Fair', weight: 2 },
				{ id: '11as2e-b1d1-11cb-9c21-f043ad409f5a9', name: 'Satisfactory', weight: 3 },
				{ id: '166661fe-b131-11c2b-9c21-f043a0d49f5a9', name: 'Good', weight: 4 },
				{ id: '5111asdfe-b1d1-11cb-9c21-f043a8d49f5a9', name: 'Excellent', weight: 5 },
			],
		},
		{
			questionId: '111r111fe-b1d1-47cb-9c21-f0434a9',
			title: 'Does the scholar apply the above knowledge regularly?',
			answer: {
				optionSelectedId: '',
				comment: 'need more education',
			},
			options: [
				{ id: '1711fe-b1d1-11cb-9c21-f043ad49f5a9', name: 'Yes', weight: 1 },
				{ id: '192fe-b1d1-11cb-9c21-f043a0d49f5a9', name: 'No', weight: 2 },
			],
		},
	],
};

export const sectionMockChanged = {
	name: 'questions',
	newValue: [
		{
			questionId: '111111fe-b1d1-47cb-9c21-f043ad49f5a9',
			title: 'annie, are you okay?',
			answer: {
				optionSelectedId: '111111fe-b1d1-11cb-9c21-f043ad49f5a9',
				comment: 'not im not okay',
			},
			options: [
				{ id: '111111fe-b1d1-11cb-9c21-f043ad49f5a9', name: 'Poor', weight: 1 },
				{ id: '1322fe-b1d1-11cb-9c21-f043a0d49f5a9', name: 'Fair', weight: 2 },
				{
					id: '11as2e-b1d1-11cb-9c21-f043ad409f5a9',
					name: 'Satisfactory',
					weight: 3,
				},
				{ id: '166661fe-b131-11c2b-9c21-f043a0d49f5a9', name: 'Good', weight: 4 },
				{
					id: '5111asdfe-b1d1-11cb-9c21-f043a8d49f5a9',
					name: 'Excellent',
					weight: 5,
				},
			],
		},
		{
			questionId: '111r111fe-b1d1-47cb-9c21-f0434a9',
			title: 'Does the scholar apply the above knowledge regularly?',
			answer: {
				optionSelectedId: '',
				comment: 'need more education',
			},
			options: [
				{ id: '1711fe-b1d1-11cb-9c21-f043ad49f5a9', name: 'Yes', weight: 1 },
				{ id: '192fe-b1d1-11cb-9c21-f043a0d49f5a9', name: 'No', weight: 2 },
			],
		},
	],
	skillId: '111111fe-b5d2-47cb-9c21-f043ad49f5a9',
};
