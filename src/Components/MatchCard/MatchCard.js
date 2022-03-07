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

import "./MatchCard.css";
const MatchCard = (props) => {
	let lineRef1 = useRef(null);

	let lineRef2 = useRef(null);

	let lineRef3 = useRef(null);

	let lineRef4 = useRef(null);

	const dropDownRef = useRef(null);

	const playerTest = [1, 2, 3, 4, 5];

	let teams = sortTeams();

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

		teams = sortTeams();
		//setTimeout(() => {}, 1)
	}, []);
	const econData = props.matchData.roundResults.map((match) => {
		let chartDataObject = {
			name: "Round: " + match.roundNum,
			econ: match.playerStats[0].economy.loadoutValue,
		};
		return chartDataObject;
	});

	const [dropDown, setDropDown] = useState(false);

	function calculatePlayerInfo() {}

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
				<div className="match-score">
					{winCount} : {lossCount}
				</div>
				<div className="match-position">2nd</div>
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

		if (deaths === 0) {
			KDRatio = Math.round(kills);
		} else {
			KDRatio = Math.round((kills / deaths) * 100) / 100;
		}

		return (
			<div className="match-player-stats-container">
				<div className="match-player-kda">
					<div>K/D/A</div>
					<div>
						{kills}/{deaths}/{assists}
					</div>
				</div>
				<div className="match-player-kd">
					<div>K/D</div>
					<div>{KDRatio}</div>
				</div>
				<div className="match-player-hs-percent">
					<div>HS%</div>
					<div>25%</div>
				</div>
				<div className="match-player-adr">
					<div>ADR</div>
					<div>150</div>
				</div>
				<div className="match-player-acs">
					<div>ACS</div>
					<div>238</div>
				</div>
			</div>
		);
	}

	function sortTeams() {
		let i;
		let blueTeam = [];
		let redTeam = [];
		for (i = 0; i < props.matchData.players.length; i++) {
			if (props.matchData.players[i].teamID === "blue") {
				blueTeam.push(props.matchData.players[i]);
			} else {
				redTeam.push(props.matchData.players[i]);
			}
		}

		console.log(redTeam, blueTeam);

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
			dropDownElement.style.height = "1000px";
		} else {
			dropDownElement.style.height = "0px";
		}
	}

	function renderDropDown() {
		if (dropDown) {
			return (
				<div className="match-card-drop-down-container" ref={dropDownRef}>
					<button
						onClick={() => {
							console.log(props);
						}}
					>
						CLICK
					</button>
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
							{teams.blueTeam.map((player, index) => (
								<div className="drop-down-player-container">
									<div className="drop-down-team-agent-icon-container">
										<div className="drop-down-team-agent-icon"></div>
									</div>
									<div className="drop-down-team-player-name">
										{player.playerID} #{player.tagLine}
									</div>
									<div className="drop-down-team-player-rank-container">
										<div className="drop-down-team-player-rank">PLAT</div>
									</div>
									<div className="drop-down-team-acs">300</div>
									<div className="drop-down-team-kills">30</div>
									<div className="drop-down-team-deaths">0</div>
									<div className="drop-down-team-assists">15</div>
									<div className="drop-down-team-kd">4.00</div>
									<div className="drop-down-team-adr">156</div>
									<div className="drop-down-team-hs-percent">25%</div>
									<div className="drop-down-team-econ">98</div>
								</div>
							))}
						</div>
						<div className="drop-down-team-b drop-down-team">
							<div className="drop-down-team-a drop-down-team">
								{teams.redTeam.map((player, index) => (
									<div className="drop-down-player-container">
										<div className="drop-down-team-agent-icon-container">
											<div className="drop-down-team-agent-icon"></div>
										</div>
										<div className="drop-down-team-player-name">
											{player.playerID} #{player.tagLine}
										</div>
										<div className="drop-down-team-player-rank-container">
											<div className="drop-down-team-player-rank">PLAT</div>
										</div>
										<div className="drop-down-team-acs">300</div>
										<div className="drop-down-team-kills">30</div>
										<div className="drop-down-team-deaths">0</div>
										<div className="drop-down-team-assists">15</div>
										<div className="drop-down-team-kd">4.00</div>
										<div className="drop-down-team-adr">156</div>
										<div className="drop-down-team-hs-percent">25%</div>
										<div className="drop-down-team-econ">98</div>
									</div>
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
					<div className="match-card-champion-icon"></div>
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

				{calculatePlayerStats()}
			</div>
			{renderDropDown()}
		</div>
	);
};

export default MatchCard;
