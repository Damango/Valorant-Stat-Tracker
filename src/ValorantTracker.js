import React, { useState, useEffect } from "react";
import "./ValorantTracker.css";
import MatchCard from "./Components/MatchCard/MatchCard";
import GenerateMatchData from "./GenerateMatchData/GenerateMatchData";

import MatchData from "./Match Data/MatchData";

const ValorantTracker = (props) => {
	const [currentPlayer, setCurrentPlayer] = useState("Busters#zyzz");
	const [viewState, setViewState] = useState("tracker");
	const [matchData, setMatchData] = useState(MatchData);

	const [matchSummary, setMatchSummary] = useState({ wins: 0 });

	useEffect(() => {
		calculateWinLossRatio();
	}, matchData);

	function getCurrentPlayerStats() {
		let i;

		//Change the match data index to check all matches later
		for (i = 0; i < matchData[0].players.length; i++) {
			if (matchData[0].players[i].playerID === "Busters") {
				return matchData[0].players[i];
			}
		}
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

		summaryObject = {
			wins: wins,
			losses: losses,
			winRatio: winRatio,
			KADRatio: 2.0,
		};

		setMatchSummary(summaryObject);
	}

	function calculateFavoriteAgent() {
		let i;

		let agentMap = new Map();

		for (i = 0; i < matchData.length; i++) {
			let agentIndex = matchData[i].players.findIndex(
				(player) => player.playerID + "#" + player.tagLine === currentPlayer
			);

			if (agentMap.has(matchData[i].players[agentIndex].agent)) {
				let agentCount = agentMap.get(matchData[i].players[agentIndex].agent);
				console.log("AGENT COUNT: " + agentCount);
				agentMap.set(matchData[i].players[agentIndex].agent, agentCount + 1);
			} else {
				agentMap.set(matchData[i].players[agentIndex].agent, 1);
			}
		}

		console.log(agentMap);
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
							<button
								onClick={() => {
									calculateFavoriteAgent();
								}}
							>
								CLICK
							</button>
							<div className="favorite-agent-container fav-agent-1">
								<div className="fav-agent-icon"></div>
								<div className="fav-agent-stats-container">
									<div className="fav-agent-name">Chamber</div>
									<div className="fav-agent-match-count">244 Matches</div>
								</div>
								<div className="fav-agent-win-rate">89% WR</div>
							</div>
							<div className="favorite-agent-container fav-agent-2">
								<div className="fav-agent-icon"></div>
								<div className="fav-agent-name">Killjoy</div>
								<div className="fav-agent-match-count"></div>
								<div className="fav-agent-win-rate"></div>
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
									<div>1.69</div>
								</div>
								<div className="match-history-summary-win-loss-container">
									<div className="win-loss-ratio-text-container">
										<div className="win-loss-ratio-count">
											{matchSummary.wins} / {matchSummary.losses}
										</div>
										<div className="win-loss-ratio-percentage">
											{matchSummary.winRatio}%
										</div>
									</div>
									<div className="win-loss-ratio-bar">
										<div
											className="win-loss-ratio-inner-bar"
											style={{ width: matchSummary.winRatio + "%" }}
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
