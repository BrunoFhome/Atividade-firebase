import './Header.css';
import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";


function Header() {   
    return (     
        <nav>       
            <ul>         
                <li>           <a><Link to="/">Home</Link></a>         </li>         
                       
                <li>           <a><Link to="/tarefas">Tarefas</Link></a>       </li>       
            </ul>     
        </nav>   
        ); 
} 

export default Header;