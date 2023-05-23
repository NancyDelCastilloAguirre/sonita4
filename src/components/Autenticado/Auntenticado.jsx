import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Autenticado({ children }) {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      console.log(token);
    }
  }, [navigate, token]);

  return token ? children : null;
}
