import React from "react";
import "./GenerateMatchData.css";

const GenerateMatchData = (props) => {
	let teams = ["red", "blue"];
	let maps = [
		"Ascent",
		"Haven",
		"Icebox",
		"Bind",
		"Breeze",
		"Fracture",
		"Split",
	];
	let agents = [
		"Chamber",
		"Raze",
		"Jett",
		"Reyena",
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
	];

	let names = [
		"Mambu",
		"SADE",
		"Busters",
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
			playerID: "Busters#zyzz",
			kills: Math.floor(Math.random() * 5),
			damage: Math.floor(Math.random() * 500),
			score: Math.floor(Math.random() * 1500),
			damage: [],
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
		console.log(playerStatsObject);
	}

	function generateRoundResults(roundIndex) {
		let playersStats = [];
		let i;
		for (i = 0; i < 10; i++) {}
		let roundResultObject = {
			roundNum: roundIndex,
			roundResult: "defuse",
			winningTeam: teams[Math.floor(Math.random() * 2)],
			bombPlanter: "",
			bombDefuser: "",
			playerStats: [
				{
					playerID: "Busters#zyzz",
					kills: 4,
					damage: 375,
					score: 1200,
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
				},
			],
		};
	}
	function generateMatch() {
		let i;
		let players = [];

		for (i = 0; i < 10; i++) {
			players.push(generateRandomPlayer());
		}

		let matchObject = {
			matchInfo: {
				matchID: Math.floor(Math.random() * 2000),
				mapID: maps[Math.floor(Math.random() * maps.length)],
				gameLength:
					Math.floor(Math.random() * 60) +
					"m" +
					Math.floor(Math.random() * 60) +
					"s",
				gameMode: "Competitive",
				isRanked: true,
				seasonID: "E4 A2",
				winningTeam: teams[Math.floor(Math.random() * 2)],
			},
			players: players,
		};

		console.log(matchObject);
	}

	function generatePlayerHistory() {}

	return (
		<div className="generate-match-data-container">
			<button
				className="close-generate-data-modal"
				onClick={() => {
					props.setViewState("tracker");
				}}
			>
				CLOSE
			</button>

			<button
				onClick={() => {
					generateRandomPlayer();
				}}
			>
				GENERATE PLAYER
			</button>

			<button
				onClick={() => {
					generateMatch();
				}}
			>
				MATCH OBJECT
			</button>

			<button
				onClick={() => {
					generatePlayerStats();
				}}
			>
				PLAYER STATS
			</button>
		</div>
	);
};

export default GenerateMatchData;
