import React, { useState, useEffect } from "react";
import './inicio.css';
import { Link } from "react-router-dom";
import Header from "../header/Header";

const Inicio = () => {
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
                {/*<Link to="/UserTrials">
                    <div className="disImg">
                        <img src="/records.jpg" alt=""/>
                        <span className="links">UserTrials</span>
                    </div>                   
                </Link>*/}                                   
            </div>
        </div>
    );
}

export default Inicio;
