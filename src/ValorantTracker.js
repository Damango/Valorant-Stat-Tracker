import React, { useState } from "react";
import "./ValorantTracker.css";
import MatchCard from "./Components/MatchCard/MatchCard";
import GenerateMatchData from "./GenerateMatchData/GenerateMatchData";

import MatchData from "./Match Data/MatchData";

const ValorantTracker = (props) => {
	const [currentPlayer, setCurrentPlayer] = useState("Busters#zyzz");
	const [viewState, setViewState] = useState("tracker");
	const [matchData, setMatchData] = useState(MatchData);

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
		for (i = 0; i < matchData.length; i++) {
			if (matchData[i].matchInfo.winningTeam === theCurrentPlayer.teamID) {
				wins++;
			} else {
				losses++;
			}
		}

		return wins + "/" + losses;
	}

	function renderViewState() {
		if (viewState === "generate") {
			return (
				<GenerateMatchData
					setViewState={setViewState}
					matchData={matchData}
					setMatchData={setMatchData}
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
							<div className="favorite-agent-container fav-agent-1">
								Chamber
							</div>
							<div className="favorite-agent-container fav-agent-2">
								Kill Joy
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
											{calculateWinLossRatio()}
										</div>
										<div className="win-loss-ratio-percentage">65%</div>
									</div>
									<div className="win-loss-ratio-bar">
										<div className="win-loss-ratio-inner-bar"></div>
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
