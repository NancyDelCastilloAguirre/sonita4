import "./bob.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { JoinLeft, Send } from "@mui/icons-material";
import MessageBob from "../../components/message/MessageBob";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { URL } from "../../URL";
import Autenticado from "../../components/Autenticado/Auntenticado";
import BurbujaDeTexto from "../../components/burbujaTexto/BurbujaTexto";
import jwt_decode from "jwt-decode"


const { Configuration, OpenAIApi }=require("openai");

const config=new Configuration({
    apiKey: process.env.REACT_APP_PUBLIC_KEY
});
const openai=new OpenAIApi(config);

export default function BOB() {  
  const [mensaje, setMensaje] = useState("");
  const [selectedFile, setSelectedFile]=useState([])
  const [infoPDF,setInfoPDF]=useState("")
  const [files, setFiles]=useState(null)
  const [username, setUsername]=useState("")
  const [keywordsToPdf, setKeywordsToPdf] = useState([]);
  const [respuesta, setRespuesta]=useState("Hola! soy BOB, ¿En qué puedo ayudarte?")

  const token = window.localStorage.getItem("token")
  const decodeToken = jwt_decode(token)
  const id = decodeToken.id
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${URL}api/users?userId=${id}`)
        setUsername(res.data.username)
      } catch (error) {
        console.log("ERRO" + error)
      }
    }
    fetchUser()
  }, [])

  const extraerInfo=()=>{
    const formData=new FormData();
    for(let i=0; i<selectedFile.length;i++){
      formData.append(`pdfFile`, selectedFile[i])
    }
    console.log(formData);
    if(selectedFile){
        axios.post(`${URL}extract-text`, formData, {
            headers: { 
                "Content-Type": "multipart/form-data"
             }
        }).then(response=>response.data)
    .then(data=>{console.log("Data" +data)
    setInfoPDF(data);
    }).catch((error) => {    
    console.error(error);    
    });  
    }else{
        console.log("input is falsy");
    }
    }
    function generateKeywords(filename) {
      const baseFilename = filename.replace(/\.pdf$/, "").replace(/_/g, " ");
      const keywords = baseFilename.split(" ").map(word => word.toLowerCase());
      return keywords;
    }
    useEffect(()=>{
      const obtenerF = async ()=>{
        try {
          const response =await axios.get(`${URL}files`);
          setFiles(response.data)
          console.log(files);

          const keywordsToPdf = response.data.map((filename) => {
            return {
              keywords: generateKeywords(filename),
              file: `${URL}pdf/${filename}`,
            };
          });

          setKeywordsToPdf(keywordsToPdf);
        } catch (error) {
            console.log(error);
        }
      };
      obtenerF();
    }, [])

    async function sendRequestCountIncrement(filename) {
      try {
        const response = await axios.post(`${URL}api/pdfCount/incrementRequestCount`, { filename });
        console.log(response.data.message);
      } catch (error) {
        console.error('Error incrementing request count:', error);
      }
    }
    async function selectPdfFiles(userInput) {
      console.log(userInput);
    
      const userInputLowerCase = userInput.toLowerCase();
      const selectedFiles = [];
    
      for (const entry of keywordsToPdf) {
        if (entry.keywords.some((keyword) => userInputLowerCase.includes(keyword))) {
          selectedFiles.push(entry.file);
          sendRequestCountIncrement(entry.file); 
        }
      }
      setSelectedFile(selectedFiles);
      return selectedFiles;
    }
  const handleKeyDown = async (event) => {
  console.log(event.key);
  console.log(event.target.value);
  if (event.key === 'Enter') {
    event.preventDefault();
    console.log(selectedFile);
    const filesP = await selectPdfFiles(event.target.value);
    console.log(filesP);
    const files = await Promise.all(filesP.map(fetchPdfAsFile));
    setSelectedFile(files);
    handleSubmit(event);
    extraerInfo();
  }
};
  const handleSubmit = async (event) => {
    event.preventDefault();
  const filesP = await selectPdfFiles(mensaje);
  console.log(filesP);
  const files = await Promise.all(filesP.map(fetchPdfAsFile));
  setSelectedFile(files);
    //IA
  const runPrompt=async(r)=>{
  const promptI='Soy BOB, un ChatBot creado por los estudiantes de programación. B.O.B significa "Bot Operativo de Batiz" y estoy aqui sólo para informar a las personas en los trámites escolares.'
  const promptPDF= '\nTus respuestas puede venir de la Información extraída de los archivos PDF: ' + infoPDF
  const prompt= promptI + promptPDF + "\n Por favor, responde de manera apropiada, coherente y resumida a la pregunta del usuario: " + ` \nUsuario llamado ${username}:` + mensaje
  
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role":"system", "content": prompt},
      {"role": "user", "content":mensaje}
    ],

  });
  console.log(completion.data.choices[0].message);
  console.log(completion.data.usage); 
  setRespuesta(completion.data.choices[0].message.content)
  
  return r;

};

runPrompt().then(r=>{
    console.log(r);
})

    setMensaje("");
  }


  async function fetchPdfAsFile(path) {
    const response = await fetch(path);
    const data = await response.blob();
    const filename = path.split('/').pop();
    return new File([data], filename, { type: 'application/pdf' });
  }


  return (
    <>
    <Autenticado>
      <Topbar />

      <div className="bobContainer">      
        <Sidebar />
        <div className="bob">
        <div className="chatBox" sx={{maxWidth: 100}}>
            <BurbujaDeTexto texto={respuesta}/>
                <div className="chatMenuInput">
                <img className="img-float" src="/LOGO_BOB.png" alt="BOB" width="250px" />
                <div className="chatBoxBottom2">
                <textarea 
                    className="chatMessageInput" 
                    placeholder="Escribe tu mensaje"
                    variant="outlined"
                    size="small"
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setMensaje(e.target.value)}
                    value={mensaje}
                  >
                  </textarea>
                  <button className="chatSubmit" onClick={handleSubmit}>
                    <Send sx={{ color: "white" }}/>
                  </button>
                </div>
              </div>
            </div>
        </div>
        </div>
    </Autenticado>
    </>
  )
}