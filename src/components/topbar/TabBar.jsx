import React from 'react';
import './tabbar.css';
import {Link} from "react-router-dom"
import { Home,Forum,People,BookmarkBorderOutlined,AccountCircle,SmartToy } from "@mui/icons-material"
import IconoBOB from "../sidebar/IconoBOB.png"

const TabBar = () => {
  return (
    <div className="tab-bar">
      <Link to="/home" className="tab-item"><Home sx={{ color: 'white' }}/></Link>
      <Link to="/chat" className="tab-item"><Forum sx={{ color: 'white' }}/></Link>
      <Link to="/bob" className="tab-item"><img src={IconoBOB} alt="Icono" className='iconBOB'/></Link>
      <Link to="/home" className="tab-item" ><a sx={{ color: 'white'}}>SONA</a></Link>
      <Link to="/followed" className="tab-item"><People sx={{ color: 'white' }}/></Link>
      <Link to="/saved" className="tab-item"><BookmarkBorderOutlined sx={{ color: 'white' }}/></Link>
      <Link to="/profile/" className="tab-item"><AccountCircle sx={{ color: 'white' }}/></Link>
      
    </div>
  );
};

export default TabBar;