import React, { useState, useEffect } from "react";
import "./ValorantTracker.css";
import MatchCard from "./Components/MatchCard/MatchCard";
import GenerateMatchData from "./GenerateMatchData/GenerateMatchData";

import MatchData from "./Match Data/MatchData";

// Match Generation function
import generateMatches from "./GenerateMatchData/GenerateMatches";

const ValorantTracker = (props) => {
	const [currentPlayer, setCurrentPlayer] = useState("Busters#zyzz");
	const [viewState, setViewState] = useState("tracker");
	const [matchData, setMatchData] = useState(MatchData);

	const [historySummary, setHistorySummary] = useState({
		wins: 0,
		losses: 0,
		winRatio: 0,
		KADRatio: 0.0,
		mostPlayedAgent: [0, 1],
		secondMostPlayedAgent: [0, 1],
	});

	useEffect(() => {
		let i;
		let matchArray = MatchData;

		for (i = 0; i < 20; i++) {
			matchArray.push(generateMatches());
		}

		setMatchData(matchArray);

		calculateHistorySummary();
	}, matchData);

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
		console.log(summaryObject);
		setHistorySummary(summaryObject);
	}

	function getCurrentPlayerStats() {
		let i;
		//Change the match data index to check all matches later
		for (i = 0; i < matchData[0].players.length; i++) {
			if (matchData[0].players[i].playerID === "Busters") {
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
			for (let i = 0; i < agentMap.size - 1; i++) {
				let currentAgent = agentIterator.next().value;

				if (!mostPlayedAgent) {
					mostPlayedAgent = currentAgent;
				} else {
					if (mostPlayedAgent[1] < currentAgent[1]) {
						secondMostPlayedAgent = mostPlayedAgent;
						mostPlayedAgent = currentAgent;
					}
				}
			}
		}
		return {
			mostPlayedAgent: mostPlayedAgent,
			secondMostPlayedAgent: secondMostPlayedAgent,
		};
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

	return (
		<div className="valorant-tracker-container">
			<div className="nav-bar-container">
				<button
					onClick={() => {
						setViewState("generate");
					}}
				>
					Generate Valorant Data
				</button>
			</div>

			<div className="main-view-container">
				{renderViewState()}
				<div className="main-view-wrapper">
					<div className="profile-summary-container">
						<div className="profile-rank-and-details-container">
							<div className="profile-icon-name-container">
								<div className="profile-icon-container">
									<div className="profile-level-container">287</div>
								</div>
								<div className="profile-name-container">BUSTERS#Zyzz</div>
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
								<div className="fav-agent-icon"></div>
								<div className="fav-agent-stats-container">
									<div className="fav-agent-name">
										{historySummary.mostPlayedAgent[0]}
									</div>
									<div className="fav-agent-match-count">
										{historySummary.mostPlayedAgent[1]} Matches
									</div>
								</div>
								<div className="fav-agent-win-rate">89% WR</div>
							</div>
							<div className="favorite-agent-container fav-agent-2">
								<div className="fav-agent-icon"></div>
								<div className="fav-agent-name">
									{historySummary.secondMostPlayedAgent[0]}
								</div>
								<div className="fav-agent-match-count">
									{historySummary.secondMostPlayedAgent[1]} Matches
								</div>
								<div className="fav-agent-win-rate">89% WR</div>
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
											{historySummary.wins} / {historySummary.losses}
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
								{matchData.map((match, index) => (
									<MatchCard
										matchData={match}
										index={index}
										currentPlayer={currentPlayer}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ValorantTracker;
