import "./sidebar.css"
import IconoBOB from "./IconoBOB.png"
import { Home,Forum,Person,NotificationsActive,BookmarkBorderOutlined,AccountCircle } from "@mui/icons-material"
import {Link} from "react-router-dom"
import Logout from "../logout/Logout"
import ModalHablarAdmi from "../modalestuto/ModalHablarAdmi"


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
            <li className="sidebarListItem">
                <Home className="sidebarIcon" />
                <Link  to="/home" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Inicio</span>
                </Link>  
            </li>
            <li className="sidebarListItem">
                <Forum  className="sidebarIcon" />
                <Link  to="/chat" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Chats</span>
                </Link>
                {/*<span><ModalHablarAdmi/></span>*/}
            </li>
            <li className="sidebarListItem">
                <img src={IconoBOB} alt="Icono" className="iconBOB" />
                <Link to="/bob" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">BOB</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                <Link to="/followed" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Seguidos</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <BookmarkBorderOutlined className="sidebarIcon" />
                <Link to="/saved" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Guardados</span>
                </Link>
            </li>
            {/*<li className="sidebarListItem">
                <AccountCircle className="sidebarIcon" />
                <Link to="/profile/" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Cuenta</span>
                </Link>
            </li>*/}
        </ul>
        
      </div>
    </div>
  )
}
