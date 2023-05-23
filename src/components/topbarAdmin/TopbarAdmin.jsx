import "./topbarAdmin.css"
import { Search } from "@mui/icons-material"
import {Link} from "react-router-dom"
import TabBarAdmin from "./TabBarAdmin"
import Logout from "../logout/Logout"
import {AccountCircle, } from "@mui/icons-material"

export default function TopbarAdmin() {
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
            <Link  to="/profileadmin/" style={{textDecoration:"none",color:"white"}}>
            <span className="sidebarListItemText">Cuenta</span>
            </Link>
        </button>
        </div>
          <Logout />
      </div>
    </div><div className="topbarContainer2">
        <div className="tab-bar">
          <TabBarAdmin />
        </div>
      </div></>
  )
}
