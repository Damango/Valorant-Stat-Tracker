import React, { useState, useEffect } from "react";
import "./ValorantTracker.css";
import MatchCard from "./Components/MatchCard/MatchCard";
import GenerateMatchData from "./GenerateMatchData/GenerateMatchData";

import MatchData from "./Match Data/MatchData";

// Match Generation function
import generateMatches from "./GenerateMatchData/GenerateMatches";

//Agent Image Handler
import AgentImage from "./Components/AgentImage/AgentImage";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ValorantTracker = (props) => {
	const [currentPlayer, setCurrentPlayer] = useState("mambu#iwnl");
	const [viewState, setViewState] = useState("tracker");
	const [matchData, setMatchData] = useState(undefined);

	const [historySummary, setHistorySummary] = useState({
		wins: 0,
		losses: 0,
		winRatio: 0,
		KADRatio: 0.0,
		mostPlayedAgent: ["...", 152],
		secondMostPlayedAgent: ["...", 125],
	});

	useEffect(() => {
		animateRankDetails();

		animateFavoriteAgent();
		matchGeneration();
	}, []);

	useEffect(() => {
		if (matchData != undefined) {
			calculateHistorySummary();
			animateNumbers(1000);
		}
	}, [matchData]);

	function submitUser() {
		let inputElement = document.querySelector(".username-input");
		let inputValue = inputElement.value;
		let i;
		let tagBoolean = false;
		for (i = 0; i < inputValue.length; i++) {
			if (inputValue[i] === "#") {
				tagBoolean = true;
			}
		}

		if (tagBoolean) {
			matchGeneration(inputValue);
		} else {
			inputValue += "#iwnl";
			matchGeneration(inputValue);
		}
	}

	function matchGeneration(username) {
		let i;
		let matchArray = [];

		for (i = 0; i < 25; i++) {
			if (username) {
				let fullUserName = userNameSplicer(username);
				setCurrentPlayer(username);
				let name = fullUserName.name;
				let tagLine = fullUserName.tagLine;
				matchArray.push(generateMatches(name, tagLine));
			} else {
				let fullUserName = userNameSplicer(currentPlayer);
				let name = fullUserName.name;
				let tagLine = fullUserName.tagLine;
				matchArray.push(generateMatches(name, tagLine));
			}
		}
		setMatchData(matchArray);
	}

	function userNameSplicer(fullAccountName) {
		let theString = fullAccountName;
		let i;

		let name;
		let tagLine;
		for (i = 0; i < theString.length; i++) {
			if (theString[i] === "#") {
				tagLine = theString.slice(i + 1);
				name = theString.slice(0, i);
			}
		}

		return { name: name, tagLine: tagLine };
	}

	function calculateHistorySummary() {
		let summaryObject = {};
		let agents = calculateFavoriteAgent();
		let winLossStats = calculateWinLossRatio();
		let KAD = calculateKADSummary();

		summaryObject.mostPlayedAgent = agents.mostPlayedAgent;
		summaryObject.secondMostPlayedAgent = agents.secondMostPlayedAgent;
		summaryObject.wins = winLossStats.wins;
		summaryObject.losses = winLossStats.losses;
		summaryObject.winRatio = winLossStats.winRatio;
		summaryObject.KADRatio = KAD;

		setHistorySummary(summaryObject);
	}

	function getCurrentPlayerStats() {
		let i;

		//Change the match data index to check all matches later
		for (i = 0; i < matchData[0].players.length; i++) {
			let playerID = matchData[0].players[i].playerID;
			let tagLine = matchData[0].players[i].tagLine;
			if (playerID + "#" + tagLine === currentPlayer) {
				return matchData[0].players[i];
			}
		}
	}

	function calculateKADSummary() {
		let i, j;
		let kills = 0,
			deaths = 0;
		for (i = 0; i < matchData.length; i++) {
			for (j = 0; j < matchData[i].roundResults.length; j++) {
				let agentIndex = matchData[i].roundResults[j].playerStats.findIndex(
					(player) => player.playerID === currentPlayer
				);
				kills += matchData[i].roundResults[j].playerStats[agentIndex].kills;
				matchData[i].roundResults[j].playerStats[agentIndex].died
					? (deaths += 1)
					: (deaths += 0);
			}
		}
		return Math.round((kills / deaths) * 100) / 100;
	}

	function calculateWinLossRatio() {
		let i;
		let wins = 0;
		let losses = 0;
		let theCurrentPlayer = getCurrentPlayerStats();
		let summaryObject;
		let winRatio;
		for (i = 0; i < matchData.length; i++) {
			if (matchData[i].matchInfo.winningTeam === theCurrentPlayer.teamID) {
				wins++;
			} else {
				losses++;
			}
		}
		winRatio = Math.round((wins / (wins + losses)) * 100);
		summaryObject = { ...historySummary };
		summaryObject.wins = wins;
		summaryObject.losses = losses;
		summaryObject.winRatio = winRatio;
		summaryObject.KADRatio = 2.0;

		return { wins: wins, losses: losses, winRatio: winRatio, KADRatio: 2.0 };
	}

	function calculateFavoriteAgent() {
		let i;
		let agentMap = new Map();
		let agentIterator;
		let mostPlayedAgent;
		let secondMostPlayedAgent;
		for (i = 0; i < matchData.length; i++) {
			let agentIndex = matchData[i].players.findIndex(
				(player) => player.playerID + "#" + player.tagLine === currentPlayer
			);
			if (agentMap.has(matchData[i].players[agentIndex].agent)) {
				let agentCount = agentMap.get(matchData[i].players[agentIndex].agent);
				agentMap.set(matchData[i].players[agentIndex].agent, agentCount + 1);
			} else {
				agentMap.set(matchData[i].players[agentIndex].agent, 1);
			}
		}

		agentIterator = agentMap.entries();

		if (agentMap.size === 1) {
			mostPlayedAgent = agentIterator.next().value;
		} else {
			for (let i = 0; i < agentMap.size; i++) {
				let currentAgent = agentIterator.next().value;
				console.log(currentAgent[1]);
				if (mostPlayedAgent === undefined) {
					mostPlayedAgent = currentAgent;
				}

				if (currentAgent[1] > mostPlayedAgent[1]) {
					secondMostPlayedAgent = mostPlayedAgent;
					mostPlayedAgent = currentAgent;
				} else if (currentAgent[1] === mostPlayedAgent[1]) {
					secondMostPlayedAgent = currentAgent;
				} else if (currentAgent[1] < mostPlayedAgent[1]) {
					if (currentAgent[1] > secondMostPlayedAgent[1]) {
						secondMostPlayedAgent = currentAgent;
					}
					if (secondMostPlayedAgent[0] === mostPlayedAgent[0]) {
						secondMostPlayedAgent = currentAgent;
					}
				}

				console.log("CURRENT:" + currentAgent);
			}
			console.log("MOST PLAYED: " + mostPlayedAgent);
			console.log("2nd MOST PLAYED: " + secondMostPlayedAgent);
		}

		if (!secondMostPlayedAgent) {
			secondMostPlayedAgent = ["Sova", 1000];
		}
		if (!mostPlayedAgent) {
			mostPlayedAgent = ["Chamber", 20000];
		}

		calculateFavAgentWinRate(mostPlayedAgent);

		mostPlayedAgent.push(calculateFavAgentWinRate(mostPlayedAgent));
		secondMostPlayedAgent.push(calculateFavAgentWinRate(secondMostPlayedAgent));
		return {
			mostPlayedAgent: mostPlayedAgent,
			secondMostPlayedAgent: secondMostPlayedAgent,
		};
	}

	function calculateFavAgentWinRate(mostPlayedAgent) {
		let i;
		let agentMatches = mostPlayedAgent[1];
		let matchesWon = 0;
		let winRate;

		for (i = 0; i < matchData.length; i++) {
			let playerIndex = matchData[i].players.findIndex(
				(player) => player.playerID + "#" + player.tagLine === currentPlayer
			);
			if (matchData[i].players[playerIndex].agent === mostPlayedAgent[0]) {
				if (matchData[i].matchInfo.winningTeam === "blue") {
					matchesWon++;
				}
			}
		}

		winRate = matchesWon / agentMatches;
		winRate = Math.floor(winRate * 1000) / 10;

		return winRate;
	}

	function renderViewState() {
		if (viewState === "generate") {
			return (
				<GenerateMatchData
					setViewState={setViewState}
					matchData={matchData}
					setMatchData={setMatchData}
					calculateWinLossRatio={calculateWinLossRatio}
				/>
			);
		} else {
			return "";
		}
	}

	function animateRankDetails() {
		let container = document.querySelector(
			".profile-rank-and-details-container"
		);
		container.style.opacity = 1;
		container.style.top = "0px";
	}

	function animateFavoriteAgent() {
		let container = document.querySelector(".favorite-agents-container");
		container.style.opacity = 1;
		container.style.top = "0px";
	}

	function animateNumbers(duration) {
		let startTimestamp = null;
		let playerLevel = getCurrentPlayerStats().playerLevel;
		let playerLevelElement = document.querySelector(".profile-level-container");
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			playerLevelElement.innerHTML = Math.floor(
				progress * (playerLevel - 0) + 0
			);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	return (
		<div className="valorant-tracker-container">
			<div className="nav-bar-container">
				<div className="user-search-container">
					<input className="username-input" placeholder="PlayerName#Tagline" />
					<button
						className="search-button"
						onClick={() => {
							submitUser();
						}}
					>
						<FontAwesomeIcon icon={faMagnifyingGlass} />
					</button>
				</div>
			</div>

			<div className="main-view-container">
				{renderViewState()}
				<div className="main-view-wrapper">
					<div className="profile-summary-container">
						<div className="profile-rank-and-details-container">
							<div className="profile-icon-name-container">
								<div className="profile-icon-container">
									<div className="profile-level-container">0</div>
								</div>
								<div className="profile-name-container">{currentPlayer}</div>
							</div>
							<div className="account-ranks-container">
								<div className="account-current-rank-container">
									<div className="current-rank-image-container">
										<div className="current-rank-image"></div>
									</div>
									<div className="current-rank-text-container">
										<div className="current-rank-text">Current Rank</div>
										<div className="current-rank-name-text">Immortal 3</div>
									</div>
								</div>
								<div className="account-peak-rank-container">
									<div className="peak-rank-image-container">
										<div className="peak-rank-image"></div>
									</div>
									<div className="peak-rank-text-container">
										<div className="peak-rank-text">Peak Rank</div>
										<div className="peak-rank-name-text">Radiant #255</div>
									</div>
								</div>
							</div>
						</div>

						<div className="favorite-agents-container">
							<span>FAVORITE AGENTS</span>

							<div className="favorite-agent-container fav-agent-1">
								<div
									className="fav-agent-icon"
									style={AgentImage(
										historySummary.mostPlayedAgent[0].toLowerCase()
									)}
								></div>
								<div className="fav-agent-stats-container">
									<div className="fav-agent-name">
										{historySummary.mostPlayedAgent[0]}
									</div>
									<div className="fav-agent-match-count">
										{historySummary.mostPlayedAgent[1]} Matches
									</div>
								</div>
								<div className="fav-agent-win-rate">
									{historySummary.mostPlayedAgent[2]}% WR
								</div>
							</div>
							<div className="favorite-agent-container fav-agent-1">
								<div
									className="fav-agent-icon"
									style={AgentImage(
										historySummary.secondMostPlayedAgent[0].toLowerCase()
									)}
								></div>
								<div className="fav-agent-stats-container">
									<div className="fav-agent-name">
										{historySummary.secondMostPlayedAgent[0]}
									</div>
									<div className="fav-agent-match-count">
										{historySummary.secondMostPlayedAgent[1]} Matches
									</div>
								</div>
								<div className="fav-agent-win-rate">
									{historySummary.secondMostPlayedAgent[2]}% WR
								</div>
							</div>
						</div>
					</div>
					<div className="match-history-container">
						<div className="match-history-container-header">Match History</div>
						<div className="match-history-wrapper">
							<div className="match-history-summary">
								<div className="match-history-summary-rank">
									<div className="match-history-summary-rank-image"></div>

									<div className="match-history-summary-rank-text-container">
										<div>Immortal</div>
										<div>80RR</div>
									</div>
								</div>
								<div className="match-history-summary-kad">
									<div>KAD Ratio</div>
									<div>{historySummary.KADRatio}</div>
								</div>
								<div className="match-history-summary-win-loss-container">
									<div className="win-loss-ratio-text-container">
										<div className="win-loss-ratio-count">
											{historySummary.wins}W / {historySummary.losses}L
										</div>
										<div className="win-loss-ratio-percentage">
											{historySummary.winRatio}%
										</div>
									</div>
									<div className="win-loss-ratio-bar">
										<div
											className="win-loss-ratio-inner-bar"
											style={{ width: historySummary.winRatio + "%" }}
										></div>
									</div>
								</div>
							</div>
							<div className="match-history-card-list-container">
								{matchData != undefined
									? matchData.map((match, index) => (
											<MatchCard
												matchData={match}
												index={index}
												currentPlayer={currentPlayer}
												key={"match-card-" + index}
											/>
									  ))
									: "nothing"}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ValorantTracker;
