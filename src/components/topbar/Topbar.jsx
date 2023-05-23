import "./topbar.css"
import "./tabbar.css"
import {Link} from "react-router-dom"
import TabBar from "./TabBar";
import Logout from "../logout/Logout"
import {AccountCircle, } from "@mui/icons-material"


export default function Topbar() {

  return (
    <><div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/homeAdmin" style={{ textDecoration: "none" }}>
          <span className="logo">SONA</span><span className="logoAdmin">Admin</span>
        </Link>
      </div>
      <div className="topbarCenter"></div>
      <div className="topbarRight">
        <div className="non">
          <button className="modalbuttonRed" style={{backgroundColor: "transparent", borderRadius: "0px"}}>
              <AccountCircle className="sidebarIcon" />
              <Link  to="/profile/" style={{textDecoration:"none",color:"white"}}>
              <span className="sidebarListItemText">Cuenta</span>
              </Link>
          </button>
        </div>
          <Logout />
      </div>
    </div>
    <div className="topbarContainer2">
        <div className="tab-bar">
          <TabBar />
        </div>
      </div></>
  )
}
