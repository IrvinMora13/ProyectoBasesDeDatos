import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "../components/inicio/Inicio";
import Skills from "../components/skills/Skills";
import Loadout from "../components/loadout/Loadout";
import Weapons from "../components/weapons/Weapons";
import UserTrials from "../components/userTrials/UserTrials";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Skills" element={<Skills />} />
            <Route path="/Loadout" element={<Loadout />} />
            <Route path="/Weapons" element={<Weapons />} />
            <Route path="/UserTrials" element={<UserTrials />} />
        </Routes>
    );
}

export default AppRoutes;