import React from "react";
import "./ValorantTracker.css";
import MatchCard from "./Components/MatchCard/MatchCard"

const ValorantTracker = (props) => {



	let matchHistory = [1, 2, 3, 4, 5]



	return <div className="valorant-tracker-container">
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
						<div className="match-history-summary">

						</div>
						<div className="match-history-card-list-container">
							{matchHistory.map((match, index) => <MatchCard index={index} />)}
						</div>
					</div>
				</div>
			</div>

		</div>



	</div>;
};

export default ValorantTracker;
