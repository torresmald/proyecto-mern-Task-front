import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
function Tarea({ tarea }) {
    const {handleSetEditarTarea, handleSetEliminarTarea} = useProyectos();

    const { nombre, descripcion, prioridad, fechaEntrega, estado } = tarea;
    
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
            <div className="">
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
            </div>
            <div className="flex gap-1 flex-col mr-5">
                <button className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold rounded-md text-xs" onClick={() => handleSetEditarTarea(tarea)}>
                    Editar
                </button>
                {estado ? (
                    <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold rounded-md text-xs">
                        Completa
                    </button>

                ) : (
                    <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold rounded-md text-xs">
                        Incompleta
                    </button>
                )}
                <button className="bg-red-600 px-4 py-3 text-white uppercase font-bold rounded-md text-xs" onClick={() => handleSetEliminarTarea(tarea)}>
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default Tarea;