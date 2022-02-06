
const pug = require('pug');

const compiledFunction = pug.compileFile('./views/leaderboard.pug');

console.log(compiledFunction({
	holes: [
		{ number: 1, par: 4, teams: [ 'sac', 'mia', 'gs', 'lac' ] },
		{ number: 2, par: 5, teams: [ 'den', 'ind', 'hou', 'chi', 'phi' ] },
		{ number: 3, par: 4, teams: [ 'mil', 'tor', 'okc', 'cle' ] },
		{ number: 4, par: 3, teams: [ 'chi', 'lal', 'mia' ] },
		{ number: 5, par: 4, teams: [ 'uta', 'dal', 'den', 'por' ] },
		{ number: 6, par: 3, teams: [ 'orl', 'lac', 'wsh' ] },
		{ number: 7, par: 4, teams: [ 'det', 'mil', 'atl', 'phx' ] },
		{ number: 8, par: 5, teams: [ 'no', 'sa', 'orl', 'ind', 'bkn' ] },
		{ number: 9, par: 4, teams: [ 'dal', 'cha', 'den', 'mem' ] },
		{ number: 10, par: 4, teams: [ 'sa', 'gs', 'sac', 'ny' ] },
		{ number: 11, par: 4, teams: [ 'mem', 'det', 'no', 'wsh' ] },
		{ number: 12, par: 3, teams: [ 'cle', 'mia', 'phi' ] },
		{ number: 13, par: 5, teams: [ 'tor', 'cle', 'det', 'min', 'uta' ] },
		{ number: 14, par: 4, teams: [ 'por', 'ny', 'min', 'uta' ] },
		{ number: 15, par: 5, teams: [ 'min', 'bos', 'cha', 'mil', 'dal' ] },
		{ number: 16, par: 3, teams: [ 'atl', 'bos', 'sa' ] },
		{ number: 17, par: 4, teams: [ 'lal', 'okc', 'hou', 'phi' ] },
		{ number: 18, par: 4, teams: [ 'chi', 'bkn', 'phx', 'por' ] }
	],
	standings: [
		{
			player: 'Patrick',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }
			]
		},
		{
			player: 'Schex',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }
			]
		},
		{
			player: 'Adam',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }
			]
		},
		{
			player: 'Kevin',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }

			]
		},
		{
			player: 'Justin',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }
			]
		},
		{
			player: 'Mitch',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }
			]
		},
		{
			player: 'Joe',
			holes: [
				{ number: 1, par: 4, score: 3 },
				{ number: 2, par: 4 },
				{ number: 3, par: 4 },
				{ number: 4, par: 4 },
				{ number: 5, par: 4 },
				{ number: 6, par: 4 },
				{ number: 7, par: 4 },
				{ number: 8, par: 4 },
				{ number: 9, par: 4 },
				{ number: 10, par: 4 },
				{ number: 11, par: 4 },
				{ number: 12, par: 4 },
				{ number: 13, par: 4 },
				{ number: 14, par: 4 },
				{ number: 15, par: 4 },
				{ number: 16, par: 4 },
				{ number: 17, par: 4 },
				{ number: 18, par: 4 }
			]
		}
	]
}));
