let teams = ["red", "blue"];
let maps = ["Ascent", "Haven", "Icebox", "Bind", "Breeze", "Fracture", "Split"];
let agents = [
	"Chamber",
	"Raze",
	"Jett",
	"Reyna",
	"Sova",
	"Viper",
	"Neon",
	"Phoenix",
	"Sage",
	"Breach",
	"Killjoy",
	"Cypher",
	"Astra",
	"Brimstone",
	"Skye",
];

let names = [
	"Mambu",
	"SADE",
	"Giga Busters",
	"DonnieTMain",
	"EVIL Busters",
	"Evil Mambu",
	"Evil Sade",
	"Evil DonnieTmain",
	"Foster",
	"Evil Foster",
];

let weapons = [
	"Classic",
	"Vandal",
	"Phantom",
	"Operator",
	"Bulldog",
	"Sheriff",
	"Ghost",
	"Guardian",
	"Marshall",
	"Odin",
];
function generateRandomPlayer() {
	let playerObject = {
		playerID: names[Math.floor(Math.random() * names.length)],
		tagLine: "zyzz",
		teamID: teams[Math.floor(Math.random() * 2)],
		partyID: "test",
		agent: agents[Math.floor(Math.random() * agents.length)],
		compRank: "Immortal II",
		playerLevel: Math.floor(Math.random() * 500),
		stats: [],
	};

	return playerObject;
}

function generatePlayerStats() {
	let playerStatsObject = {
		playerID: names[Math.floor(Math.random() * names.length)] + "#zyzz",
		kills: Math.floor(Math.random() * 2.5),
		damage: Math.floor(Math.random() * 500),
		score: Math.floor(Math.random() * 1500),
		died: Math.random() < 0.5,
		economy: {
			loadoutValue: Math.floor(Math.random() * 7000),
			weapon: weapons[Math.floor(Math.random() * weapons.length)],
			armor: "full",
			remaining: Math.floor(Math.random() * 1000),
			spent: Math.floor(Math.random() * 5000),
		},
		ability: {
			test: "Brim Molly",
		},
	};

	return playerStatsObject;
}

function generateRoundResults(roundIndex) {
	let playersStats = [];
	let j;
	for (j = 0; j < 9; j++) {
		playersStats.push(generatePlayerStats());
	}
	playersStats.push({
		playerID: "Busters#zyzz",
		kills: Math.floor(Math.random() * 5),
		damage: Math.floor(Math.random() * 500),
		score: Math.floor(Math.random() * 1500),
		died: Math.random() < 0.5,
		damage: [],
		economy: {
			loadoutValue: 800,
			weapon: "Vandal",
			armor: "full",
			remaining: 5000,
			spent: 3900,
		},
		ability: {
			test: "Brim Molly",
		},
	});
	let i;
	for (i = 0; i < 10; i++) {}
	let roundResultObject = {
		roundNum: roundIndex,
		roundResult: "defuse",
		winningTeam: teams[Math.floor(Math.random() * 2)],
		bombPlanter: "",
		bombDefuser: "",
		playerStats: playersStats,
	};

	return roundResultObject;
}
function generateMatch() {
	let i, j;
	let players = [];
	let roundResults = [];

	for (j = 0; j < 26; j++) {
		roundResults.push(generateRoundResults(j + 1));
	}

	for (i = 0; i < 9; i++) {
		players.push(generateRandomPlayer());
	}

	players.push({
		playerID: "Busters",
		tagLine: "zyzz",
		teamID: teams[Math.floor(Math.random() * 2)],
		partyID: "test",
		agent: agents[Math.floor(Math.random() * agents.length)],
		compRank: "Immortal II",
		playerLevel: Math.floor(Math.random() * 500),
		stats: [],
	});

	let matchObject = {
		matchInfo: {
			matchID: Math.floor(Math.random() * 2000),
			mapID: maps[Math.floor(Math.random() * maps.length)],
			gameLength:
				Math.floor(Math.random() * 45) +
				15 +
				"m" +
				Math.floor(Math.random() * 60) +
				"s",
			gameMode: "Competitive",
			isRanked: true,
			seasonID: "E4 A2",
			winningTeam: teams[Math.floor(Math.random() * 2)],
		},
		players: players,
		roundResults: roundResults,
	};
	//console.log(matchObject);

	return matchObject;
}

function generatePlayerHistory() {}

function addMatch() {
	//let matchHistory = props.matchData;
	//matchHistory.push(generateMatch());
	//.setMatchData(matchHistory);
}

export default generateMatch;