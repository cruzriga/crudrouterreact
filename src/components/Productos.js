import React from "react";
import LiProducto from "./LiProducto";
function Productos({productos, reloadList}) {
    return (<>
        <h1 className="tex-center">Productos</h1>
        <ul className="list-group mt-5">
            {productos.map(producto => <LiProducto key = {producto.id} producto = {producto} reloadList={reloadList}/>)}
        </ul>
    </>)
}

export default Productos;
