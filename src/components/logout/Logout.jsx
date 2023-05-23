import './logout.css'
import {useNavigate  } from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout() {   
    const navigate = useNavigate ();

    const handleLogout = async () => {
        try {
          await localStorage.removeItem('token');
          navigate('/');
        } catch (error) {
          console.log("Error: ", error);
        }
      };

  return (
    <>
      <button className='modalbuttonRed' style={{backgroundColor: "transparent", verticalAlign: "text-top", width: "200px", borderRadius: "0px"}} onClick={handleLogout}>
        <LogoutIcon className="sidebarIcon"/>
        Cerrar sesión
      </button>
    </>
  );
}

