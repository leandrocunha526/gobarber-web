// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom"

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<h1 style={{"color": "white"}}>Bem vindo</h1>} />
        </Routes>
    );
}
