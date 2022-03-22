import React, { useEffect, useState } from "react";
import "./DropDownTeamPlayer.css";
import SovaIcon from "../../../media/sovaicon.webp";
import JettIcon from "../../../media/jetticon.webp";
import SageIcon from "../../../media/sageicon.webp";
import BreachIcon from "../../../media/breachicon.webp";
import AstraIcon from "../../../media/astraicon.webp";
import CypherIcon from "../../../media/cyphericon.webp";
import PhoenixIcon from "../../../media/phoenixicon.webp";
import ViperIcon from "../../../media/vipericon.webp";
import NeonIcon from "../../../media/neonicon.png";
import ReynaIcon from "../../../media/reynaicon.png";
import YoruIcon from "../../../media/yoruicon.png";
import BrimstoneIcon from "../../../media/brimstoneicon.webp";
import OmenIcon from "../../../media/omenicon.webp";
import KayoIcon from "../../../media/kayoicon.webp";
import ChamberIcon from "../../../media/chambericon.png";
import KilljoyIcon from "../../../media/killjoyicon.webp";
import SkyeIcon from "../../../media/skyeicon.webp";
import RazeIcon from "../../../media/razeicon.webp";

import AgentImage from "../../AgentImage/AgentImage";

const DropDownTeamPlayer = (props) => {
	const [playerID, setPlayerID] = useState(props.player.playerID);

	useEffect(() => {
		let theID = playerID;
		if (theID.length > 10) {
			console.log(playerID);
			theID = theID.substring(0, 10);
			console.log(playerID);
			theID += "...";
			setPlayerID(theID);
		}
	}, []);

	return (
		<div className="drop-down-player-container">
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
				<div className="drop-down-team-player-rank-container">
					<div className="drop-down-team-player-rank">PLAT</div>
				</div>
				<div className="drop-down-team-acs drop-down-player-section">300</div>
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
					25%
				</div>
				<div className="drop-down-team-econ drop-down-player-section">98</div>
			</div>
		</div>
	);
};

export default DropDownTeamPlayer;
