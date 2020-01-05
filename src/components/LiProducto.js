import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

const LiProducto = ({reloadList, producto})=> {
    const {id,nombre, precio, categoria} = producto;
    const eliminarProducto = (id) => {
        Swal.fire({
            title: '¿Esta seguro que desea eliminar?',
            text: "¡no podra deshacer esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ¡borrar!',
            cancelButtonText:'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                try{
                    const r = await axios.delete(`http://localhost:4000/restaurant/${id}`, );
                    if(r.status === 200){
                        Swal.fire(
                            'Exito',
                            'El producto se ha eliminado',
                            'success'
                        );
                        reloadList(true);
                    }
                }
                catch (e) {
                    Swal.fire(
                        {type:'error',title:'error',text:'Ha ocurrido algo al intentar procesar su solicitud, intente nuevamente'}
                    )
                }
            }
        });

    };

    return(<li className="list-group-item d-flex justify-content-between align-content-center">
        <p>
            {nombre} - <strong>${precio}</strong> <span className="badge badge-info">{categoria}</span>
        </p>
        <div>
            <Link to={`productos/editar/${id}`} className="btn btn-success mr-2">
                &#9998;
            </Link>
            <button type="button" className="btn btn-danger" onClick={()=>{eliminarProducto(id)}}>
                &times;
            </button>
        </div>
    </li>)
};

export default LiProducto;