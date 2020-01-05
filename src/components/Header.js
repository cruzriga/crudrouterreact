import React from "react";
import {Link, NavLink} from "react-router-dom";

const Header= ()=>(
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
       <div className="container">
            <Link to="/productos" className= "navbar-brand"> React CRUD & Routing </Link>
           <ul className="navbar-nav mr-auto">
               <li className="nav-item"><NavLink activeClassName="active" to="/productos" className="nav-link">Productos</NavLink></li>
               <li className="nav-item"><NavLink activeClassName="active" to="/producto/nuevo" className="nav-link">Agregar Producto</NavLink></li>
           </ul>
       </div>
   </nav>
);

export  default Header;