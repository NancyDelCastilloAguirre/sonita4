import "./login.css";
import {Link, useNavigate} from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { URL } from "../../URL";
import jwt_decode from "jwt-decode"

export default function Login() {
  const errRef = useRef();

  const navigate = useNavigate ();
  const [isReadyForInstall, setIsReadyForInstall] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');


  const handleLogin = async () =>{
    try {
      const response = await axios.post(`${URL}api/auth/login`, {
        username,
        password,
      });
      const token=response.data.token;
      const user=response.data.user;
      window.localStorage.setItem('token',token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (token) {
        try {
          const decodeToken = jwt_decode(token);
          const idUser = decodeToken.id;
          console.log(decodeToken.role);
          if (decodeToken.role === "admin") {
            navigate("/homeadmin", {token: token, user:user, userId: idUser }); 
          } else {
            navigate("/home", {token: token, user:user, userId: idUser }); 
          }
        } catch (error) {
          console.log(error);
          setErrMsg("Usuario y/o contraseña incorrectos")
        }
      }   
    } catch (err) {
      console.log(err);
      setErrMsg("Usuario y/o contraseña incorrectos")
    }
  }

  //Redirigir al usuario a la página de inicio de sesión si el token se elimina
  useEffect(() => {
    const checkToken = async () => {
      const token =  window.localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if (token) {
          try {
            const decodedToken = jwt_decode(token);
            const idUser= decodedToken.id;
            if (decodedToken.role === 'admin') {
              navigate("/homeAdmin", {token:token, userId: idUser});
            } else {
              navigate("/home", {token:token, userId: idUser});
            }
          } catch (err) {
            console.log(err);
          }
        }
      }else{
        navigate("/")
      }
    };
    checkToken();
  },[]);

  //Monitorear el cambio en el token y redirigir al usuario a la página de inicio de sesión si el token se elimina
  useEffect(() => {
    const handleTokenChange = () => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        navigate("/");
      }
    };
    window.addEventListener("storage", handleTokenChange);
    return () => window.removeEventListener("storage", handleTokenChange);
  },[]);

  //PWA
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <img src = {`${URL}assets/login.png`} className="loginImg" alt="" />
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <p className="loginBienvenida">Bienvenido a SONA</p>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p className="loginTexto">Nombre de Usuario</p>   
            <input 
              type="text"
              placeholder="Usuario" 
              id="User" 
              className="loginInput"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="loginTexto">Contraseña</p>
            <input 
              type="password" 
              id="Pass" 
              placeholder="Contraseña" 
              className="loginInput" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)}  
            />
            <Link to="/forgotpassword" style={{textDecoration:"none",color:"white"}}>
              <p className="loginForgot">Olvidaste tu contraseña?</p>
            </Link>
            <button className="loginButton" onClick={handleLogin}>Iniciar sesión</button>
            <Link to="/register" className="loginRegister" style={{textDecoration:"none",color:"white"}}>
              Crea una cuenta  
            </Link>

            {isReadyForInstall && <button onClick={downloadApp} className="loginButton">Descarga nuestra app!</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

