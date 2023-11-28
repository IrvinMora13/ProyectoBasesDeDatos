import './inicio.css';

const Inicio = () => {
    return (
        <div>
            <div className="heists">
                <img id="imagen" src="/Heists.jpg" alt="" />
            </div>
            <div className="parte_media">
                <a href="skills.html" className="imagen_s">
                    <img src="/ejemplo.jpg" alt=""/>
                    <span className="links">Skills</span>
                </a>
                <a href="weapons.html" className="imagen_s">
                    <img src="/ejemplo.jpg" alt=""/>
                    <span className="links">Weapons</span>
                </a>
                <a href="loadout.html" className="imagen_s">
                    <img src="/ejemplo.jpg" alt=""/>
                    <span className="links">Loadout</span>
                </a>
            </div>
        </div>
    );
}

export default Inicio;
