import React from "react";
import './inicio.css';
import { Link } from "react-router-dom";
import Header from "../header/Header";

const Inicio = () => {
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
