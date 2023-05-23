import BOB from "./pages/BOB/BOB";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Saved from "./pages/Saved/Saved";
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register"
import BOBAdmin from "./pages/BOBAdmin/BOBAdmin";
import Followed from "./pages/Followed/Followed";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin";
import ProfileAdmin from "./pages/ProfileAdmin/ProfileAdmin";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RestorePassword from "./pages/RestorePassword/RestorePassword";
import Estadisticas from "./pages/Estadisticas/Estadisticas";
import ProfileOthers from "./pages/ProfileOthers/ProfileOthers"
import NotFound from "./pages/NotFound/NotFound"
import SharePage from "./components/share/SharePage";
import Unauthorized from "./pages/Unauthorized/Unauthorized"
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function CheckUserRole() {
  const [role, setRole] = useState("");

  useEffect(() => {
    try{
      const token = localStorage.getItem("token");
      const decodeToken = jwt_decode(token);
      const userRole = decodeToken.role;
      setRole(userRole);
      console.log("EL ROL ES");
      console.log(userRole);
    }catch(err){
      console.log("ERROR LMAO");
      console.log(err);
    }

  }, []);
  return role;
}

function App() {
  const userRole=CheckUserRole()

  return (
    <Router>
      <Routes>
        {/* Rutas publicas */}
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword/" element={<ForgotPassword />} />
        <Route path="/restorepassword/" element={<RestorePassword />} />

        {/* Rutas usuario y administrador */}
        <Route path="/profile/" element={<Profile />} />
        <Route path="/others/:username" element={<ProfileOthers />} />

        {/* Rutas solo usuario */}
        <Route path="/bob/" element={<BOB />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/saved/" element={<Saved />} />
        <Route path="/followed/" element={<Followed />} />

        {/* Rutas solo administrador */}
        <Route path="/bobadmin/" element={<BOBAdmin />} />
        <Route path="/homeadmin/" element={<HomeAdmin />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/profileadmin/" element={<ProfileAdmin />} />
        <Route path="/sharepage/" element={<SharePage />} />

        {/* Ruta no autorización */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Ruta por defecto cuando ninguna coincide */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
