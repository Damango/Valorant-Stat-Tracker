import React, { useEffect, useRef, useState } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

import DropDownTeamPlayer from "./DropDownTeamPlayer/DropDownTeamPlayer";
import AgentImage from '../AgentImage/AgentImage'

import "./MatchCard.css";
const MatchCard = (props) => {
	let lineRef1 = useRef(null);

	let lineRef2 = useRef(null);

	let lineRef3 = useRef(null);

	let lineRef4 = useRef(null);

	const dropDownRef = useRef(null);

	const [teams, setTeams] = useState();
	const [playerObject, setPlayerObject] = useState({ kills: 0, deaths: 0, assists: 0, KDRatio: 0, adr: 0 })




	useEffect(() => {
		let line1 = lineRef1.current;
		let line2 = lineRef2.current;
		let line3 = lineRef3.current;
		let line4 = lineRef4.current;

		line1.style.transitionDelay = generateRandomDelay();
		line2.style.transitionDelay = generateRandomDelay();
		line3.style.transitionDelay = generateRandomDelay();
		line4.style.transitionDelay = generateRandomDelay();

		line1.style.width = "100%";
		line2.style.height = "100%";
		line3.style.width = "100%";
		line4.style.height = "100%";

		setPlayerObject(calculatePlayerStats())



		setTeams(sortAndCalculateTeamStats());
	}, []);
	const econData = props.matchData.roundResults.map((match) => {
		let chartDataObject = {
			name: "Round: " + match.roundNum,
			econ: match.playerStats[0].economy.loadoutValue,
		};
		return chartDataObject;
	});

	const [dropDown, setDropDown] = useState(false);


	function calculateMatchResult() {
		let i, j;
		let playerIndex = 0;
		let winCount = 0;
		let lossCount = 0;
		let roundResults = props.matchData.roundResults;

		for (i = 0; i < props.matchData.players.length; i++) {
			let playerString =
				props.matchData.players[i].playerID +
				"#" +
				props.matchData.players[i].tagLine;
			if (playerString === props.currentPlayer) {
				playerIndex = i;
			}
		}

		for (j = 0; j < roundResults.length; j++) {
			if (
				roundResults[j].winningTeam ===
				props.matchData.players[playerIndex].teamID
			) {
				winCount += 1;
			} else {
				lossCount += 1;
			}
		}

		return (
			<div>
				<div className="match-score score-section-container">
					{winCount} : {lossCount}
				</div>
				<div className="match-position score-section-container" >2nd</div>
			</div>
		);
	}

	function calculatePlayerStats() {
		let i, j;
		let roundResults = props.matchData.roundResults;

		let kills = 0;
		let deaths = 0;
		let assists = Math.floor(Math.random() * 9);
		let KDRatio = 0;

		for (i = 0; i < roundResults.length; i++) {
			for (j = 0; j < roundResults[i].playerStats.length; j++) {
				if (roundResults[i].playerStats[j].playerID === props.currentPlayer) {
					kills += roundResults[i].playerStats[j].kills;
					if (roundResults[i].playerStats[j].died) {
						deaths += 1;
					}
				}
			}
		}

		let adr = Math.floor(((Math.random() * 50) + 80) * Math.round(
			(kills / deaths) * 100
		) / 100)

		if (deaths === 0) {
			KDRatio = Math.round(kills);
		} else {
			KDRatio = Math.round((kills / deaths) * 100) / 100;
		}

		return ({ kills: kills, deaths: deaths, assists: assists, KDRatio: KDRatio, adr: adr })
	}

	function sortAndCalculateTeamStats() {
		let players = props.matchData.players;
		let i;
		let j;
		let k;
		let blueTeam = [];
		let redTeam = [];

		let roundResults = props.matchData.roundResults;
		for (i = 0; i < players.length; i++) {
			for (j = 0; j < roundResults.length; j++) {
				for (k = 0; k < roundResults[j].playerStats.length; k++) {
					if (
						players[i].playerID + "#" + players[i].tagLine ===
						roundResults[j].playerStats[k].playerID
					) {
						if (players[i].stats.kills === undefined) {
							players[i].stats.kills = roundResults[j].playerStats[k].kills;
							players[i].stats.adr = Math.floor(((Math.random() * 50) + 80) * Math.round(
								(players[i].stats.kills / players[i].stats.deaths) * 100
							) / 100);
							players[i].stats.deaths = 0;
							players[i].stats.assists = Math.floor(Math.random() * 100);
							players[i].stats.KDA =
								Math.round(
									(players[i].stats.kills / players[i].stats.deaths) * 100
								) / 100;
						} else {
							players[i].stats.kills += roundResults[j].playerStats[k].kills;
							players[i].stats.adr = Math.floor(((Math.random() * 50) + 80) * Math.round(
								(players[i].stats.kills / players[i].stats.deaths) * 100
							) / 100);
							players[i].stats.deaths += roundResults[j].playerStats[k].died
								? 1
								: 0;

							players[i].stats.KDA =
								Math.round(
									(players[i].stats.kills / players[i].stats.deaths) * 100
								) / 100;
						}
					}
				}
			}
		}

		for (i = 0; i < players.length; i++) {
			if (players[i].teamID === "blue") {
				blueTeam.push(players[i]);
			} else {
				redTeam.push(players[i]);
			}
		}

		//console.log(blueTeam);

		console.log("running");

		return { redTeam: redTeam, blueTeam: blueTeam };
	}

	function generateRandomDelay() {
		let theRandomNumber = Math.random() * 0.5;

		return theRandomNumber + props.index / 3 + "s";
	}

	function handleDropDown() {
		if (dropDown) {
			setTimeout(() => {
				setDropDown(false);
			}, 300);
			setTimeout(() => {
				animateDropDown(false);
			}, 1);
		} else {
			setDropDown(true);
			setTimeout(() => {
				animateDropDown(true);
			}, 1);
		}
	}

	function animateDropDown(dropDown) {
		let dropDownElement = dropDownRef.current;
		//Check if changing classes dynamically will allow for smooth animations with percentages
		if (dropDown) {
			dropDownElement.style.height = "1150px";
		} else {
			dropDownElement.style.height = "0px";
		}
	}

	function findUserAgent() {
		let i;
		let players = props.matchData.players;
		let user = props.currentPlayer

		for (i = 0; i < players.length; i++) {
			if (players[i].playerID + "#" + players[i].tagLine === user) {
				return (players[i].agent.toLowerCase())
			}
		}
	}

	function renderDropDown() {
		if (dropDown) {
			return (
				<div className="match-card-drop-down-container" ref={dropDownRef}>
					<button onClick={() => { console.log(props) }}>CLICK</button>
					<div className="drop-down-chart-container">
						<ResponsiveContainer width="100%" height={250}>
							<LineChart
								data={econData}
								margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
							>
								<Line type="monotone" dataKey="econ" stroke="#8884d8" />
								<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
								<XAxis dataKey="name" style={{ fontSize: "10px" }} />
								<YAxis style={{ fontSize: "10px" }} />
								<Tooltip />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<div className="drop-down-teams-container">
						<div className="drop-down-team-a drop-down-team">
							<div className="drop-down-team-header team-blue">TEAM BLUE</div>
							{teams.blueTeam.map((player, index) => (
								<DropDownTeamPlayer player={player} index={index} />
							))}
						</div>
						<div className="drop-down-team-b drop-down-team">
							<div className="drop-down-team-header team-red">TEAM RED</div>
							<div className="drop-down-team-a drop-down-team">
								{teams.redTeam.map((player, index) => (
									<DropDownTeamPlayer player={player} index={index} />
								))}
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return "";
		}
	}

	return (
		<div className="match-card-container">
			<div
				className="match-card-wrapper"
				onClick={() => {
					handleDropDown();
				}}
			>
				<div className="match-card-line line-1" ref={lineRef1}></div>
				<div className="match-card-line line-2" ref={lineRef2}></div>
				<div className="match-card-line line-3" ref={lineRef3}></div>
				<div className="match-card-line line-4" ref={lineRef4}></div>

				<div className="match-card-champion-icon-container">
					<div className="match-card-champion-icon" style={AgentImage(findUserAgent())}></div>
				</div>
				<div className="basic-match-info-container">
					<div className="match-card-map-time-container">
						<div className="match-card-map">
							{props.matchData.matchInfo.mapID}
						</div>
						<div className="match-card-time">16 Hours Ago</div>
					</div>
					<div className="match-card-game-type-length">
						<div className="match-card-type">
							{props.matchData.matchInfo.gameMode}
						</div>
						<div className="match-card-length">
							{props.matchData.matchInfo.gameLength}
						</div>
					</div>
				</div>

				<div className="match-card-rank-container"></div>

				<div className="match-score-position-container">
					{calculateMatchResult()}
				</div>

				<div className="match-player-stats-container">
					<div className="match-player-kda player-section-container">
						<div>K/D/A</div>
						<div>
							{playerObject.kills}/{playerObject.deaths}/{playerObject.assists}
						</div>
					</div>
					<div className="match-player-kd player-section-container">
						<div>K/D</div>
						<div>{playerObject.KDRatio}</div>
					</div>
					<div className="match-player-hs-percent player-section-container">
						<div>HS%</div>
						<div>25%</div>
					</div>
					<div className="match-player-adr player-section-container">
						<div>ADR</div>
						<div>{playerObject.adr}</div>
					</div>
					<div className="match-player-acs player-section-container">
						<div>ACS</div>
						<div>238</div>
					</div>
				</div>
			</div>
			{renderDropDown()}
		</div>
	);
};

export default MatchCard;
