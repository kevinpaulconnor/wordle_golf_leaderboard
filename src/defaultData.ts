import generateHoles, { relationToPar } from '../shared/utilities';
import { Tournament, Player } from '../shared/types';
const aws = require('aws-sdk');
var s3 = new aws.S3();
const bucketName = 'tournamentsbucket223547-main';

async function read(filename:string) {
	try {
	  const params = {
		Bucket: bucketName,
		Key: filename
	  }
	  const data = await s3.getObject(params).promise();
	  return {
		data: JSON.parse(data.Body),
		lastModified: data.LastModified,
	  }
	} catch (e:any) {
	  if (e.code === "NoSuchKey") {
		return e.code;
	  }
	  throw new Error(`Could not retrieve file from S3: ${e.message}`)
	}
  }

const generateData = async (tournament:Tournament) :Promise<Tournament> => {
	const resp = await read(`playerscores-${tournament.id}.json`);
	const players = Object.values(resp.data as Player[]);
	const holes = generateHoles(tournament);
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
	let ret = {...tournament, 
		players: players,
		holes: holes,
	}
	return ret
};

export default generateData;
