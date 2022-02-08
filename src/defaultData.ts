
import generateHoles, { relationToPar } from './utilities';
import { Standings, Player } from './types';

const generateData = () :Standings => {
	const holes = generateHoles();
	const players :Player[] = [
		{
			id: 1,
			displayName: 'Patrick',
			scores: [1, 2],
		},
		{
			id: 2,
			displayName: 'Schex',
			scores: [2, 3],
		},
		{
			id: 3,
			displayName: 'Adam',
			scores: [3, 10],
		},
		{
			id: 4,
			displayName: 'Kevin',
			scores: [4, 4],
		},
		{
			id: 5,
			displayName: 'Justin',
			scores: [5, 2],
		},
		{
			id: 6,
			displayName: 'Mitch',
			scores: [6, 1],
		},
		{
			id: 7,
			displayName: 'Joe',
			scores: [7, 1]
		}
	];
	players.forEach( player => {
		player.total = relationToPar(player.scores, holes);
	});
	players.sort((a, b) => {
		if (a.total !== undefined && b.total !== undefined) {
			if (a.total < b.total) return -1;
			else if (b.total < a.total) return 1;
			else return 0;
		}
		return 0;
	})
	return {
		players: players,
		holes: holes,
	}
};

export default generateData;
