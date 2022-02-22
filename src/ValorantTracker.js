import React, { useState } from "react";
import "./ValorantTracker.css";
import MatchCard from "./Components/MatchCard/MatchCard";

import MatchData from "./Match Data/MatchData";
const ValorantTracker = (props) => {
	const [currentPlayer, setCurrentPlayer] = useState("Busters#zyzz");

	return (
		<div className="valorant-tracker-container">
			<div className="nav-bar-container"></div>

			<div className="main-view-container">
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
										<div className="win-loss-ratio-count">12W / 7L</div>
										<div className="win-loss-ratio-percentage">65%</div>
									</div>
									<div className="win-loss-ratio-bar">
										<div className="win-loss-ratio-inner-bar"></div>
									</div>
								</div>
							</div>
							<div className="match-history-card-list-container">
								{MatchData.map((match, index) => (
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
