import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Axios from "axios";
import Productos from "./components/Productos";
import Producto from "./components/Producto";
import EditarProducto from "./components/EditarProducto";
import AgregarProducto from "./components/AgregarProducto";
import Header from "./components/Header";

function App() {
    const db = "http://localhost:4000";
    const [productos, guardarProductos] = useState([]);
    const [loadList, setReloadlist] = useState(true);
    useEffect(()=>{
        if(loadList){
            queryProductos().then((r)=>{
                guardarProductos(r);
                setReloadlist(false)
            });

        }
    },[loadList]);

    const queryProductos = async ()=>{
        const r = await Axios.get(`${db}/restaurant`);
        return  r.data
    };

    const editarProductos = (route) =>{
      const id = parseInt(route.match.params.id);
      const producto = productos.filter(producto => producto.id === id);
      return <EditarProducto producto = {producto[0]} reloadList={setReloadlist}/>
    };

  return (
        <Router>
            <Header/>
            <main className="container mt-5">
            <Switch>
                <Route exact path="/productos" render={()=><Productos productos={productos} reloadList = {setReloadlist}/>} />
                <Route exact path="/producto/nuevo" render={()=><AgregarProducto reloadList={setReloadlist}/>} />
                <Route exact path="/productos/editar/:id" render={props=>editarProductos(props)}/>
                <Route exact path="/productos/:id" component={Producto}/>
            </Switch>
            </main>
        </Router>
  );
}

export default App;
