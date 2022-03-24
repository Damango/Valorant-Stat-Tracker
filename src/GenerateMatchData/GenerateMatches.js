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

let ranks = ["Gold", "Platinum", "Diamond", "Immortal", "Radiant"];
function generateRandomPlayer(team, agentAvoid) {
	var agentList = [...agents];

	if (agentAvoid) {
		agentList.splice(agentList.indexOf(agentAvoid), 1);
	}

	let playerObject = {
		playerID: names[Math.floor(Math.random() * names.length)],
		tagLine: "zyzz",
		teamID: team,
		partyID: "",
		agent: agentList[Math.floor(Math.random() * agentList.length)],
		compRank: ranks[Math.floor(Math.random() * (ranks.length - 1))],
		playerLevel: Math.floor(Math.random() * 400) + 100,
		stats: [],
	};

	return playerObject;
}

function generatePlayerStats() {
	let playerStatsObject = {
		playerID: names[Math.floor(Math.random() * names.length)] + "#zyzz",
		kills: Math.floor(Math.random() * 2.5),
		damage: Math.floor(Math.random() * 500),
		assists: Math.floor(Math.random() * 1.2),
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

function generateRoundResults(roundIndex, playerName) {
	let playersStats = [];
	let j;
	for (j = 0; j < 9; j++) {
		playersStats.push(generatePlayerStats());
	}
	console.log(playerName);
	playersStats.push({
		playerID: playerName,
		kills: Math.floor(Math.random() * 3),
		damage: Math.floor(Math.random() * 500),
		assists: Math.floor(Math.random() * 1.2),
		score: Math.floor(Math.random() * 1500),
		died: Math.random() < 0.5,

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
function generateMatch(name, tagLine) {
	let i, j;
	let players = [];
	let roundResults = [];
	let blueWins = 0;
	let redWins = 0;
	let userName = name + "#" + tagLine;

	for (j = 0; j < 26; j++) {
		let roundResult = generateRoundResults(j + 1, userName);

		if (redWins === 13 || blueWins === 13) {
			break;
		} else {
			if (roundResult.winningTeam === "blue") {
				blueWins += 1;
			} else {
				redWins += 1;
			}

			roundResults.push(roundResult);
		}
	}

	for (i = 0; i < 9; i++) {
		let player;

		if (i > 4) {
			player = generateRandomPlayer("blue");
			for (j = 0; j < players.length; j++) {
				if (player.agent === players[j].agent) {
					player = generateRandomPlayer("blue", player.agent);
				}
			}
		} else {
			player = generateRandomPlayer("red");
			for (j = 0; j < players.length; j++) {
				if (player.agent === players[j].agent) {
					player = generateRandomPlayer("red", player.agent);
				}
			}
		}

		players.push(player);
	}

	players.push({
		playerID: name,
		tagLine: tagLine,
		teamID: "blue",
		partyID: "test",
		agent: agents[Math.floor(Math.random() * agents.length)],
		compRank: "Immortal",
		playerLevel: Math.floor(Math.random() * 400) + 100,
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
