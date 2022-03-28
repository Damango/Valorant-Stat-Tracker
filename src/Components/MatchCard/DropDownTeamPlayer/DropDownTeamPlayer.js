import React, { useEffect, useState } from "react";
import "./DropDownTeamPlayer.css";

import AgentImage from "../../AgentImage/AgentImage";

import immortalIcon from "../../../media/immortalicon.png";

import radiantIcon from "../../../media/raidanticon.png";

import platIcon from "../../../media/platicon.png";

import diamondIcon from "../../../media/diamondicon.png";

import goldIcon from "../../../media/goldicon.png";

const DropDownTeamPlayer = (props) => {
	useEffect(() => {
		let theID = playerID;
		if (theID.length > 10) {
			theID = theID.substring(0, 10);

			theID += "...";
			setPlayerID(theID);
		}
	}, []);

	const [playerID, setPlayerID] = useState(props.player.playerID);

	function renderRankImage() {
		if (props.player.compRank.toLowerCase() === "gold") {
			return goldIcon;
		} else if (props.player.compRank.toLowerCase() === "platinum") {
			return platIcon;
		} else if (props.player.compRank.toLowerCase() === "immortal") {
			return immortalIcon;
		} else if (props.player.compRank.toLowerCase() === "diamond") {
			return diamondIcon;
		} else if (props.player.compRank.toLowerCase() === "radiant") {
			return radiantIcon;
		}
	}

	function currentPlayerHighlight() {
		if (
			props.player.playerID + "#" + props.player.tagLine ===
			props.currentPlayer
		) {
			return {
				background:
					"linear-gradient(90deg, rgba(241,196,15,1) 0%, rgba(255,255,255,1) 100%)",
			};
		}
	}

	return (
		<div
			className="drop-down-player-container"
			style={currentPlayerHighlight()}
		>
			<div className="drop-down-player-agent-name-container">
				<div className="drop-down-team-agent-icon-container">
					<div
						className="drop-down-team-agent-icon"
						style={AgentImage(props.player.agent.toLowerCase())}
					></div>
				</div>
				<div className="drop-down-team-player-name">
					<div className="player-name-hover-box">
						{props.player.playerID} #{props.player.tagLine}
					</div>
					{playerID} #{props.player.tagLine}
				</div>
			</div>

			<div className="team-player-stats-container">
				<div
					className="drop-down-team-player-rank-container"
					style={{ backgroundImage: `url(${renderRankImage()})` }}
				></div>
				<div className="drop-down-team-acs drop-down-player-section">
					{props.player.stats.acs}
				</div>
				<div className="drop-down-team-kills drop-down-player-section">
					{props.player.stats.kills}
				</div>
				<div className="drop-down-team-deaths drop-down-player-section">
					{props.player.stats.deaths}
				</div>
				<div className="drop-down-team-assists drop-down-player-section">
					{props.player.stats.assists}
				</div>
				<div className="drop-down-team-kd drop-down-player-section">
					{props.player.stats.KDA}
				</div>
				<div className="drop-down-team-adr drop-down-player-section">
					{props.player.stats.adr}
				</div>
				<div className="drop-down-team-hs-percent drop-down-player-section">
					{props.player.stats.hs}%
				</div>
				<div className="drop-down-team-econ drop-down-player-section">
					{props.player.stats.econ}
				</div>
			</div>
		</div>
	);
};

export default DropDownTeamPlayer;
