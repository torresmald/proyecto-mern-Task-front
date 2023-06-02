import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
function Tarea({ tarea }) {
    const { handleSetEditarTarea, handleSetEliminarTarea, completarTarea } = useProyectos();

    const { nombre, descripcion, prioridad, fechaEntrega, estado, _id } = tarea;
    const admin = useAdmin()

    let colorTexto;
    if (prioridad === 'Baja') {
        colorTexto = 'text-lime-600';
    } else if (prioridad === 'Media') {
        colorTexto = 'text-yellow-500';
    } else {
        colorTexto = 'text-red-600';
    }
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className=" mb-2 text-xl">
                    {nombre}
                </p>
                <p className="mb-2 text-sm text-gray-500 uppercase">
                    {descripcion}
                </p>
                <p className="mb-2 text-xl">
                    {formatearFecha(fechaEntrega)}
                </p>
                <p className="mb-2 text-xl">
                    Prioridad:  <span className={`${colorTexto} font-bold`}>{prioridad}</span>
                </p>
                {estado && (
                    <p className="text-xs bg-green-600 uppercase p-1 rounded-lg text-white">Completada por {tarea.completado.nombre}</p>
                )}
            </div>
            <div className="flex gap-1 flex-col mr-5">
                {admin && (
                    <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-md text-xs" onClick={() => handleSetEditarTarea(tarea)}>
                        Editar
                    </button>
                )}
                <button className={`${estado ? 'bg-sky-600': 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`} onClick={() => completarTarea(_id)}>
                    {estado ? 'Completa' : 'Incompleta'} 
                </button>
                {admin && (
                    <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-md text-xs" onClick={() => handleSetEliminarTarea(tarea)}>
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    );
}

export default Tarea;