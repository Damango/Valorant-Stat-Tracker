import SovaIcon from "../../media/sovaicon.webp";
import JettIcon from "../../media/jetticon.webp";
import SageIcon from "../../media/sageicon.webp";
import BreachIcon from "../../media/breachicon.webp";
import AstraIcon from "../../media/astraicon.webp";
import CypherIcon from "../../media/cyphericon.webp";
import PhoenixIcon from "../../media/phoenixicon.webp";
import ViperIcon from "../../media/vipericon.webp";
import NeonIcon from "../../media/neonicon.png";
import ReynaIcon from "../../media/reynaicon.png";
import YoruIcon from "../../media/yoruicon.png";
import BrimstoneIcon from "../../media/brimstoneicon.webp";
import OmenIcon from "../../media/omenicon.webp";
import KayoIcon from "../../media/kayoicon.webp";
import ChamberIcon from "../../media/chambericon.png";
import KilljoyIcon from "../../media/killjoyicon.webp";
import SkyeIcon from "../../media/skyeicon.webp";
import RazeIcon from "../../media/razeicon.webp";




function AgentImage(agent) {




    if (agent === "sova") {
        return { backgroundImage: `url(${SovaIcon})` };
    } else if (agent === "jett") {
        return { backgroundImage: `url(${JettIcon})` };
    } else if (agent === "sage") {
        return { backgroundImage: `url(${SageIcon})` };
    } else if (agent === "brimstone") {
        return { backgroundImage: `url(${BrimstoneIcon})` };
    } else if (agent === "yoru") {
        return { backgroundImage: `url(${YoruIcon})` };
    } else if (agent === "reyna") {
        return { backgroundImage: `url(${ReynaIcon})` };
    } else if (agent === "breach") {
        return { backgroundImage: `url(${BreachIcon})` };
    } else if (agent === "viper") {
        return { backgroundImage: `url(${ViperIcon})` };
    } else if (agent === "astra") {
        return { backgroundImage: `url(${AstraIcon})` };
    } else if (agent === "cypher") {
        return { backgroundImage: `url(${CypherIcon})` };
    } else if (agent === "phoenix") {
        return { backgroundImage: `url(${PhoenixIcon})` };
    } else if (agent === "neon") {
        return { backgroundImage: `url(${NeonIcon})` };
    } else if (agent === "omen") {
        return { backgroundImage: `url(${OmenIcon})` };
    } else if (agent === "kayo") {
        return { backgroundImage: `url(${KayoIcon})` };
    } else if (agent === "chamber") {
        return { backgroundImage: `url(${ChamberIcon})` };
    } else if (agent === "killjoy") {
        return { backgroundImage: `url(${KilljoyIcon})` };
    } else if (agent === "skye") {
        return { backgroundImage: `url(${SkyeIcon})` };
    } else if (agent === "raze") {
        return { backgroundImage: `url(${RazeIcon})` };
    }

}

export default AgentImage