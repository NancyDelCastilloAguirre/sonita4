import "./register.css";
import {Link, useNavigate  } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../URL";

const EXPREG_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const EXPREG_USERNAME = /^[a-zA-Z][a-zA-Z0-9_]{7,34}$/;
const EXPREG_PASSWORD = /(?=(.*[0-9]))(?=.*[#$%&.])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,35}$/;  

export default function Register() {
  const navigate = useNavigate ();
  const errRef = useRef();

  const [user, setUser]=useState("")
  const [validUser, setValidUser]=useState(false)
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail]=useState("")
  const [validEmail, setValidEmail]=useState(false)
  const [emailFocus, setEmailFocus] = useState(false);

  const [pass1, setPass1]=useState("")
  const [validPass1, setValidPass1]=useState(false)
  const [pass1Focus, setPass1Focus] = useState(false);
  
  const [pass2, setPass2]=useState("")
  const [validPass2, setValidPass2]=useState(false)
  const [pass2Focus, setPass2Focus] = useState(false);

  const [errMsg, setErrMsg] = useState('');

  
  useEffect(() => {
    setValidUser(EXPREG_USERNAME.test(user));
  }, [user])

  useEffect(() => {
    setValidEmail(EXPREG_EMAIL.test(email));
  }, [email])

  useEffect(() => {
    setValidPass1(EXPREG_PASSWORD.test(pass1));
      setValidPass2(pass1 === pass2);
  }, [pass1, pass2])

  useEffect(() => {
      setErrMsg('');
  }, [user,email, pass1, pass2])

  function validarCaracterUsername(e){
    var codigoTecla = e.keyCode ? e.keyCode : e.which;
    if (
      (codigoTecla >= 65 && codigoTecla <= 90) || 
      (codigoTecla >= 97 && codigoTecla <= 122) || 
      (codigoTecla >= 48 && codigoTecla <= 57) ||
      codigoTecla === 46 || 
      codigoTecla === 95 
    ) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  function validarCaracterEmail(e){
    var codigoTecla = e.keyCode ? e.keyCode : e.which;
    if (
      (codigoTecla >= 65 && codigoTecla <= 90) || 
      (codigoTecla >= 97 && codigoTecla <= 122) || 
      (codigoTecla >= 48 && codigoTecla <= 57) ||
      codigoTecla === 46 || codigoTecla === 64 
    ) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  function validarCaracterPassword(e){
    var codigoTecla = e.keyCode ? e.keyCode : e.which;
    if (
      (codigoTecla >= 65 && codigoTecla <= 90) || 
      (codigoTecla >= 97 && codigoTecla <= 122) || 
      (codigoTecla >= 48 && codigoTecla <= 57) ||
      codigoTecla === 33 ||  
      codigoTecla === 64 ||  
      codigoTecla === 37 ||  
      codigoTecla === 38 ||  
      codigoTecla === 63 ||  
      codigoTecla === 42 ||  
      codigoTecla === 95 ||  
      codigoTecla === 45 ||
      codigoTecla === 61 ||  
      codigoTecla === 43 ||  
      codigoTecla === 46 ||  
      codigoTecla === 44     
    ) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }
  


  function eliminarC(e){
    // Obtener el texto que se va a pegar
    var textoPegado = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    // Eliminar los caracteres "<" y ">"
    var textoSinCaracteres = textoPegado.replace(/[<>{}()|°()=-_^?¬]/g, "");

    // Pegar el texto sin caracteres en el input
    e.preventDefault();
    document.execCommand("insertHTML", false, textoSinCaracteres);
  }

  const handleRegister= async (e) =>{
    e.preventDefault();

    const v1 = EXPREG_USERNAME.test(user);
    const v2 = EXPREG_PASSWORD.test(pass1);
    const v3 = EXPREG_EMAIL.test(email);

    if(!v1 || !v2 || !v3){
      setErrMsg("Registro Inválido")
      return
    }
    if(pass1!== pass2){
      setErrMsg("Las contraseñas no coinciden");
      return 
    }
    console.log(user);
    console.log(email);
    console.log(pass1);
    console.log(pass2);
    
      axios.post(`${URL}api/auth/register`, {username:user, email:email, password:pass1})
      .then((res)=>{
        console.log(res.data)
        navigate("/");
      }).catch((err)=>{
        if(!err?.response){
          setErrMsg("El servidor no responde")
        }else if (err.response?.status === 409){
          setErrMsg("Nombre de usuario o correo en uso")
        }else if (err.response?.status === 500){
          setErrMsg("Nombre de usuario o correo en uso")
        }
        errRef.current.focus()
      })
  }
 
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">   
        <img src = {`${URL}assets/login.png`} className="loginImg" alt="" />
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <p className="registerBienvenida">Crear una cuenta</p>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p className="registerTexto">Nombre de Usuario</p>   
            <input 
              type="text"
              id="User"
              onChange={(e) => setUser(e.target.value)}
              onKeyPress={(event)=>validarCaracterUsername(event)}
              onPaste={(e)=> eliminarC(e)}
              autoComplete="off"
              placeholder="Usuario" 
              className="registerInput" 
              required
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
              Debe iniciar con una letra.<br/>
              Debe tener mínimo 8 caracteres.<br/>
              No debe tener acentos ni espacios.<br/>
              Solo acepta guiones bajos como caracter especial.
            </p>   
            <p className="registerTexto">Email</p>  
            <input 
              type="email"
              id="Email"
              onChange={(e) => { setEmail(e.target.value)}}
              onKeyPress={(event)=>validarCaracterEmail(event)}
              onPaste={(e)=> eliminarC(e)}
              autoComplete="off"  
              placeholder="Email"
              className="registerInput"
              required
              aria-describedby="emlnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id="emlnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
              El correo electrónico debe ser válido.
            </p>  
            <p className="registerTexto">Contraseña</p>
            <input 
              type="password"
              onChange={(e) => setPass1(e.target.value)}
              onKeyPress={(event)=>validarCaracterPassword(event)}
              onPaste={(e)=> eliminarC(e)}
              id="Pass1"
              autoComplete="off"
              placeholder="Contraseña" 
              className="registerInput" 
              required
              aria-describedby="pwdnote"
              onFocus={() => setPass1Focus(true)}
              onBlur={() => setPass1Focus(false)}
            />
            <p id="pwdnote" className={pass1Focus && !validPass1 ? "instructions" : "offscreen"}>
              Debe ser mínimo de 8 caracteres. <br/>
              No debe tener acentos ni espacios.<br/>
              Debe contener una mayuscula, una minuscula, un número y un caracter especial. <br/>
              Acepta ! @ % & ? * _ - = + . , 
            </p> 
            <p className="registerTexto">Confirmar Contraseña</p>  
            <input 
              type="password" 
              id="Pass2" 
              onChange={(e) => setPass2(e.target.value)}
              onKeyPress={(event)=>validarCaracterPassword(event)}
              onPaste={(e)=> eliminarC(e)}
              autoComplete="off"
              placeholder="Confirmar Contraseña" 
              className="registerInput"
              required
              aria-describedby="pwd2note" 
              onFocus={() => setPass2Focus(true)}
              onBlur={() => setPass2Focus(false)}
            />
            <p id="pwd2note" className={pass2Focus && !validPass2 ? "instructions" : "offscreen"}>
              Las contraseñas no coinciden  
            </p> 
            <p className="registerLogin"> </p>
            <button className="registerButton" onClick={handleRegister} >Registrarse</button>
            <Link to="/" className="loginRegister" style={{textDecoration:"none",color:"white"}}>
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

