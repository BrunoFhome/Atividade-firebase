import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/home/login.js';
import Tarefas from './pages/incluir/tarefas.js';
import Header from './components/Header/header.js';



function RoutesApp() {
    return(
        <BrowserRouter>

            <Header/>

            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/tarefas" element={<Tarefas/>} />
    
            </Routes>

        
        </BrowserRouter>
    );
}

export default RoutesApp;