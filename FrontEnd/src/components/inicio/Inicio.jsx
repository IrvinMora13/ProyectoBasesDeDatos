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
        } catch (error) {
          console.error('Error al obtener datos del servidor:', error);
        }
      };
  
      fetchData();
    }, []);
    return (
        <div className="inicio">
            <Header/>
            <div className="heists">
                <img id="imagen" src="/Heists.jpg" alt="" />
            </div>
            <div className="parte_media">
                <Link to="/Skills">
                    <div className="disImg">
                        <img src="/skills.jpg" alt=""/>
                        <span className="links">Skills</span>
                    </div>
                </Link>
                    {/* Aqui se muestra el dato obtenido de la base de datos*/}
                    <p>{skillsData.length > 3 && `ID de la Cuarta Skill: ${skillsData[3][2]}`}</p>
                <Link to="/Weapons"> 
                    <div className="disImg">
                        <img src="/armas.jpg" alt=""/>
                        <span className="links">Weapons</span>
                    </div>
                </Link>      
                <Link to="/Loadout">  
                    <div className="disImg">
                        <img src="/loadout.jpg" alt=""/>
                        <span className="links">Loadout</span>
                    </div>                     
                </Link>                  
                <Link to="/UserTrials">
                    <div className="disImg">
                        <img src="/records.jpg" alt=""/>
                        <span className="links">UserTrials</span>
                    </div>                   
                </Link>                  
            </div>
        </div>
    );
}

export default Inicio;
