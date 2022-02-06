import generateHoles from './utilities';

const defaultData = {
	holes: generateHoles(),
	standings: [
		{
			id: 1,
			displayName: 'Patrick',
			holes: generateHoles([3]),
		},
		{
			id: 2,
			displayName: 'Schex',
			holes: generateHoles([3]),
		},
		{
			id: 3,
			displayName: 'Adam',
			holes: generateHoles([3]),
		},
		{
			id: 4,
			displayName: 'Kevin',
			holes: generateHoles([3]),
		},
		{
			id: 5,
			displayName: 'Justin',
			holes: generateHoles([3]),
		},
		{
			id: 6,
			displayName: 'Mitch',
			holes: generateHoles([3]),
		},
		{
			id: 7,
			displayName: 'Joe',
			holes: generateHoles([3]),
		}
	]
};

export default defaultData;
