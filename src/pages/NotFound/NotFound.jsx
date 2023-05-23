import { Link } from "react-router-dom"
import "./notFound.css"

export default function NotFound() {
  return (
    <div className="nfWrapper">
      <div className="nfContainer">
        <img className="BOBImg" src="https://apisona30-production.up.railway.app/assets/SadBOB.png" alt="No se encuentra la img" />
        <h1 className="nfText">404 Página no encontrada</h1>
        <Link to="/" style={{textDecoration:"none",color:"white"}}>
          <h1 className="nfTextSmol">Regresar al inicio</h1>
        </Link>      
      </div> 
    </div>
  )
}
