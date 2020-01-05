import React, {useRef, useState, useEffect} from "react";
import axios from 'axios';
import Swal from "sweetalert2";
import {withRouter} from 'react-router-dom';
function EditarProducto(props) {
    const {history, reloadList, match} = props;
    const id = match.params.id;
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [categoria, setCategoria] = useState('');
    const _nombre = useRef('');
    const _precio = useRef('');
    const [errors, setErrors]  = useState(false);

    useEffect(()=>{
        const getProductoData = async () =>{
            const r = await axios.get(`http://localhost:4000/restaurant/${id}`);
            let producto = r.data;
            setNombre(producto.nombre);
            setPrecio(producto.precio);
            setCategoria(producto.categoria);
        };
        getProductoData();
    },[]);
    const radioChange = (e) => {
            setCategoria(e.target.value);
    };

    const enviar = async (e)=>{
        e.preventDefault();
        setErrors(false);
        const data = {
            nombre : _nombre.current.value,
            precio : _precio.current.value,
            categoria
        };

        if(data.nombre === '' || data.precio === ''){
            setErrors(true);
            return;
        }

        try {
            const r = await axios.put(`http://localhost:4000/restaurant/${id}`, data);
            if(r.status === 200){
                Swal.fire(
                    'Exito',
                    'El producto se ha editado correctamente',
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

    const Categorias = ({categoria}) =>(
        <div className="text-center">
            <div className="form-check form-check-inline">
                <input
                    className="form-check-input"
                    type="radio"
                    name="categoria"
                    value="postre"
                    defaultChecked={categoria === 'postre'}
                    onChange={radioChange}
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
                    defaultChecked={categoria === 'bebida'}
                    onChange={radioChange}
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
                    defaultChecked={categoria === 'cortes'}
                    onChange={radioChange}
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
                    defaultChecked={categoria === 'ensalada'}
                    onChange={radioChange}
                />
                <label className="form-check-label">
                    Ensalada
                </label>
            </div>
        </div>
    );

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto: {nombre}</h1>
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
                        defaultValue= {nombre}
                        ref={_nombre}
                    />
                </div>

                <div className="form-group">
                    <label>Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder=""
                        defaultValue= {precio}
                        ref = {_precio}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <Categorias categoria = {categoria} />
                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>

    )
}

export default withRouter(EditarProducto);
