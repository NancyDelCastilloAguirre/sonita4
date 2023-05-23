import "./restorePassword.css";
import {useNavigate  } from "react-router-dom"
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../URL";

const EXPREG_PASSWORD = /(?=(.*[0-9]))(?=.*[!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,35}$/;  

export default function RestorePassword() {
    const navigate = useNavigate ();
    const errRef = useRef();
  
    const [email, setEmail]=useState("")
  
    const [pass1, setPass1]=useState("")
    const [validPass1, setValidPass1]=useState(false)
    const [pass1Focus, setPass1Focus] = useState(false);
    
    const [pass2, setPass2]=useState("")
    const [validPass2, setValidPass2]=useState(false)
    const [pass2Focus, setPass2Focus] = useState(false);
  
    const [errMsg, setErrMsg] = useState('');
    
      useEffect(() => {
        setValidPass1(EXPREG_PASSWORD.test(pass1));
          setValidPass2(pass1 === pass2);
      }, [pass1, pass2])
    
      useEffect(() => {
          setErrMsg('');
      }, [email, pass1, pass2])
      function validarCaracter(e){
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
    
      const handleRestore= async (e) =>{
        e.preventDefault();
        const v2 = EXPREG_PASSWORD.test(pass1);
    
        if(!v2){
          setErrMsg("Registro Inválido")
          return
        }
          //Aqui va el axios para editar, se debe cambiar la contraseña perteneciente al correo
          axios.post(`${URL}api/auth/register`, {email:email, password:pass1})
          .then((res)=>{
            console.log(res.data)
            navigate("/");
          }).catch((err)=>{
            if(!err?.response){
              setErrMsg("El servidor no responde")
            }else if (err.response?.status === 409){
              setErrMsg("Nombre de usuario o correo en uso")
            }
            errRef.current.focus()
          })
      }
     

    return (
        <div className="restore">
        <div className="restoreWrapper">
            <div className="restoreLeft">
                
            <img src = {`${URL}assets/login.png`} className="loginImg" alt="" />
            </div>
            <div className="restoreRight">
            <div className="restoreBox">
                <p className="restoreBienvenida">Restaura tu contraseña</p>
                <p className="restoreTexto">Email de la cuenta</p>  
                <input 
                    type="email"
                    id="Email"
                    onChange={(e) => { setEmail(e.target.value)}}
                    onKeyPress={(event)=>validarCaracter(event)}
                    onPaste={(e)=> eliminarC(e)}
                    autoComplete="off"  
                    placeholder="Email"
                    className="registerInput"
                    required
                />
                <p className="registerTexto">Contraseña</p>
                <input 
                    type="password"
                    onChange={(e) => setPass1(e.target.value)}
                    onKeyPress={(event)=>validarCaracter(event)}
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
                La contraseña debe ser mínimo de 8 caracteres. <br/>
                Debe contener una mayuscula, una minuscula, un número y un caracter especial. <br/>
                </p> 
                <p className="registerTexto">Confirmar Contraseña</p>  
                <input 
                    type="password" 
                    id="Pass2" 
                    onChange={(e) => setPass2(e.target.value)}
                    onKeyPress={(event)=>validarCaracter(event)}
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
                <button className="restoreButton" onClick={handleRestore}>Restaurar</button>
            </div>
            </div>
        </div>
        </div>
    );
    }

