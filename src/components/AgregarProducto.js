import React, {useState} from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';
function AgregarProducto({history, reloadList}) {
    const [nombre, setNombre]  = useState('');
    const [categoria, setCategoria]  = useState('');
    const [precio, setPrecio]  = useState('');
    const [errors, setErrors]  = useState(false);

    const enviar = async (e)=>{
        e.preventDefault();
        setErrors(false);
        if (nombre === '' || categoria === '' || precio === ''){
            setErrors(true);
            return;
        }
        try {
            const r = await axios.post('http://localhost:4000/restaurant', {
                nombre, precio, categoria
            });
            if(r.status === 201){
                Swal.fire(
                    'Exito',
                    'El producto se ha creado correctamente',
                    'success'
                ).then(()=>{
                    history.push('/productos');
                    reloadList(true);
                    }
                )
            }
        }
        catch (e) {
            Swal.fire(
                {type:'error',title:'error',text:'Ha ocurrido algo al intentar procesar su solicitud, intente nuevamente'}
            )
        }

    };

    const Errors = ({error})=> ((error) ? <p className="alert alert-danger p3 my-5 text-center text-uppercase font-weight-bold">
        Todos los campos son requeridos
    </p>: null);
    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            <Errors error={errors}/>
            <form
                className="mt-5"
                onSubmit={enviar}
            >
                <div className="form-group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder=""
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder=""
                        onChange={e => setPrecio(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            onChange={e => setCategoria(e.target.value)}
                        />
                        <label className="form-check-label">
                            Postre
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            onChange={e => setCategoria(e.target.value)}
                        />
                        <label className="form-check-label">
                            Bebida
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            onChange={e => setCategoria(e.target.value)}
                        />
                        <label className="form-check-label">
                            Cortes
                        </label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            onChange={e => setCategoria(e.target.value)}
                        />
                        <label className="form-check-label">
                            Ensalada
                        </label>
                    </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>

    )
}

export default withRouter(AgregarProducto);
