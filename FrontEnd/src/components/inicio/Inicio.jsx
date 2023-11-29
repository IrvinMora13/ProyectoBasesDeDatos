import React, { useState, useEffect } from "react";
import './inicio.css';
import { Link } from "react-router-dom";
import Header from "../header/Header";

const Inicio = () => {
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/data');
          const data = await response.json();
          setSkillsData(data);
          console.log('Datos desde el servidor:', data);
        } catch (error) {
          console.error('Error al obtener datos del servidor:', error);
        }
      };
  
      fetchData();
    }, []);
    return (
        <div>
            <Header/>
            <div className="heists">
                <img id="imagen" src="/Heists.jpg" alt="" />
            </div>
            <div className="parte_media">
                <Link to="/Skills">
                    <img src="/skills.jpg" alt=""/>
                </Link>
                    <span className="links">Skills</span>
                    {/* Aqui se muestra el dato obtenido de la base de datos*/}
                    <p>{skillsData.length > 3 && `ID de la Cuarta Skill: ${skillsData[3][1]}`}</p>
                <Link to="/Weapons"> 
                    <img src="/armas.jpg" alt=""/>
                </Link>
                    <span className="links">Weapons</span>
                <Link to="/Loadout">    
                    <img src="/loadout.jpg" alt=""/>
                </Link>
                    <span className="links">Loadout</span>
                <Link to="/UserTrials">
                    <img src="/records.jpg" alt=""/>
                </Link>
                    <span className="links">UserTrials</span>
            </div>
        </div>
    );
}

export default Inicio;
