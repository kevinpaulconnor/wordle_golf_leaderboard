
import generateHoles, { relationToPar } from '../shared/utilities';
import { Standings, Player } from '../shared/types';
import players from './results/players.json';

const generateData = () :Standings => {
	const holes = generateHoles();
	players.forEach( (player:Player) => {
		player.total = relationToPar(player.scores, holes);
	});
	players.sort((a:Player, b:Player) => {
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
