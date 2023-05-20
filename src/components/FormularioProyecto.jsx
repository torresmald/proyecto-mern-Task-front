import { useState, useEffect} from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";

function FormularioProyecto() {
    const params = useParams();
    const {handleSetAlerta, alerta, submitProyecto, proyecto} = useProyectos();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [cliente, setCliente] = useState('');
    const [id, setId] = useState(null);

    useEffect(() => {
        if(params.id) {
            setCliente(proyecto.cliente)
            setDescripcion(proyecto.descripcion)
            setFecha(proyecto.fechaEntrega?.split('T')[0])
            setNombre(proyecto.nombre)
            setId(proyecto._id)
        }
    }, [params])

    const hanldeSubmit = async (event) => {
        event.preventDefault()

        if ([nombre, descripcion, fecha, cliente].includes('')){
            handleSetAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }

        await submitProyecto({nombre, descripcion, fecha, cliente, id})
        setCliente('')
        setDescripcion('')
        setFecha('')
        setNombre('')
        setId(null)
    }

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow" onSubmit={hanldeSubmit}>
           {alerta.msg && <Alerta alerta={alerta}/>}
            <div className="mb-5">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre Proyecto</label>
                <input type="text" id="nombre" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre Proyecto" value={nombre} onChange={(event) => setNombre(event.target.value)} />

                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripcion Proyecto</label>
                <textarea id="descripcion" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Descripcion Proyecto" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />

                <label htmlFor="fecha" className="text-gray-700 uppercase font-bold text-sm">Fecha Entrega</label>
                <input type="date" id="fecha" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={fecha} onChange={(event) => setFecha(event.target.value)} />

                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Nombre Cliente</label>
                <input type="text" id="cliente" className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="Nombre Cliente" value={cliente} onChange={(event) => setCliente(event.target.value)} />
            </div>

            <input type="submit" value={`${params.id  ? 'Editar' : 'Crear'}`} className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-800 transition-colors" />

        </form>
    );
}

export default FormularioProyecto;