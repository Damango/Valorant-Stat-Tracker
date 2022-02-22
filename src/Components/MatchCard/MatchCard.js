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
	const data = [
		{ name: "Round 1", econ: -950, pv: 2400, amt: 2400 },
		{ name: "Round 2", econ: 4500, pv: 2400, amt: 2400 },
		{ name: "Round 3", econ: 16748, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 2050, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 4000, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
		{ name: "Page A", econ: 400, pv: 2400, amt: 2400 },
	];

	const [dropDown, setDropDown] = useState(false);

	let lineRef1 = useRef(null);

	let lineRef2 = useRef(null);

	let lineRef3 = useRef(null);

	let lineRef4 = useRef(null);

	const dropDownRef = useRef(null);

	function calculatePlayerInfo() {
		console.log(props.matchData);
	}

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
			console.log(roundResults[j].winningTeam);
			if (
				roundResults[j].winningTeam ===
				props.matchData.players[playerIndex].teamID
			) {
				winCount += 1;
			} else {
				lossCount += 1;
			}
		}

		console.log("WIN COUNT: " + winCount);
		console.log("LOSS COUNT: " + lossCount);

		return (
			<div>
				<div className="match-score">
					{winCount} : {lossCount}
				</div>
				<div className="match-position">2nd</div>
			</div>
		);
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
		console.log(dropDownElement);
		console.log(dropDown);

		if (dropDown) {
			dropDownElement.style.height = "300px";
		} else {
			dropDownElement.style.height = "0px";
		}
	}

	function renderDropDown() {
		if (dropDown) {
			return (
				<div className="match-card-drop-down-container" ref={dropDownRef}>
					<div className="drop-down-chart-container">
						<button onClick={() => calculateMatchResult()}>CLICK</button>
						<ResponsiveContainer width="100%" height={250}>
							<LineChart
								data={data}
								margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
							>
								<Line type="monotone" dataKey="econ" stroke="#8884d8" />
								<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
								<XAxis dataKey="name" />
								<YAxis style={{ fontSize: "10px" }} />
								<Tooltip />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			);
		} else {
			return "";
		}
	}

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

		//setTimeout(() => {}, 1)
	}, []);

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

				<div className="match-player-stats"></div>
			</div>
			{renderDropDown()}
		</div>
	);
};

export default MatchCard;
