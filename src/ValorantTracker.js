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
						<div className="account-name-rank-container">BUSTERS#Zyzz</div>
						<div className="favorite-agent-container"></div>
					</div>
					<div className="match-history-container">
						<div className="match-history-container-header">Match History</div>
						<div className="match-history-wrapper">
							<div className="match-history-summary"></div>
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
