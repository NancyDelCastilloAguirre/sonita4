import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import Table from "react-bootstrap/Table";
import "./Chart.css"
import axios from "axios";
import { URL } from "../../URL";
import Autenticado from "../Autenticado/Auntenticado";
export default function ChartComponent(props)  {
  
  console.log(props.data);

  var data=props.data
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const [files, setFiles]=useState([])
  var labels=data.map(item=>item.filename)
  var values=data.map(item=>item.requestCount)
  var fileNames=labels.map((url)=>{
    
    return url.split('/').pop()
  })

  useEffect(()=>{
    const obtenerF = async ()=>{
      try {
        const response =await axios.get(`${URL}files`);
        setFiles(response.data)
        console.log(files);
      } catch (error) {
          console.log(error);
      }
    };
    obtenerF();
  }, [])
  

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // Si ya existe una instancia del gráfico, la destruimos
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      // Creamos una nueva instancia del gráfico
      chartRef.current.chartInstance = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: fileNames,
          datasets: [
            {
              label: "No. de consultas",
              data: values,
              backgroundColor: [
                "rgba(220, 20, 60, 0.2)",
                "rgba(219, 112, 147, 0.2)",
                "rgba(237, 122, 157, 0.2)",
                "rgba(255, 176, 181, 0.2)",
                "rgba(254, 157, 157, 0.2)",
                "rgba(240, 128, 128, 0.2)",
            ],
            borderColor: [
                "rgba(220, 20, 60, 1)",
                "rgba(219, 112, 147, 1)",
                "rgba(237, 122, 157, 1)",
                "rgba(255, 176, 181, 1)",
                "rgba(254, 157, 157, 1)",
                "rgba(240, 128, 128, 1)",
            ],            
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Número de consultas por archivo',
              font: {
                size: 20 // cambiar el tamaño del encabezado
              }
            }
          }
        },
      });
    }
  }, [fileNames]);

  useEffect(() => {
    if (chartRef && chartRef.current && chartRef.current.chartInstance) {
      // Obtenemos los datos de la gráfica
      const chartData = chartRef.current.chartInstance.data.datasets;
      setChartData(chartData);
      // agregamos esta línea para actualizar el estado de React
    }
  }, [chartRef]);
  

  return (
    <>
    <Autenticado>
    <div className="section">
      
      <canvas ref={chartRef} />
    </div>
    <div className="section2">
      {chartData && (
        <Table striped bordered hover className="container">
          <thead>
            <tr>
              <th>Nombre PDF</th>
              <th>No. de consultas</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item, index) => {
            var a = item.filename.split('/').pop();
            return (
              <tr key={index}>
                <td>{a}</td>
                <td>{item.requestCount}</td>
              </tr>
            );
          })}
        </tbody>
        </Table>
      )}
        <div>
    </div>
      </div>
    </Autenticado>
    </>
  );
};