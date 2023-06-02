import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import useProyectos from '../hooks/useProyectos';
import Loading from './Loading';
import Alerta from './Alerta';
import Modal from './ModalTarea';
import ModalEliminarTarea from './ModalEliminarTarea';
import Tarea from './Tarea';
import Colaborador from './Colaborador';
import ModalEliminarColaborador from './ModalEliminarColaborador';
import useAdmin from '../hooks/useAdmin';
import { io } from 'socket.io-client';

let socket;

function Proyecto() {
    const params = useParams();

    const admin = useAdmin();

    const { obtenerProyecto, proyecto, cargando, eliminarProyecto, alerta, handleSetModalTarea, submitTareasProyecto, deleteTareasProyecto, editarTareaProyecto, editarEstadoTarea } = useProyectos();
    const { nombre } = proyecto;
    useEffect(() => {
        obtenerProyecto(params.id)
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    })

    useEffect(() => {
        socket.emit('abrirProyecto', params.id)
    })
    useEffect(() => {
        socket.on('tareaAgregada', (tareaNueva) => {
            if (tareaNueva.proyecto === proyecto._id) {
                submitTareasProyecto(tareaNueva)
            }
        })
        socket.on('tareaEliminada', (tareaEliminada) => {
            if (tareaEliminada.proyecto === proyecto._id) {
                deleteTareasProyecto(tareaEliminada);
            }
        })
        socket.on('tareaActualizada', (tareaActualizada) => {
            if (tareaActualizada.proyecto._id === proyecto._id) {
                editarTareaProyecto(tareaActualizada)
            }
        })
        socket.on('estadoActualizado', (estadoActualizado) => {
            if (estadoActualizado.proyecto._id === proyecto._id) {
                editarEstadoTarea(estadoActualizado)
            }
        })
    })
    return (
        cargando ? <Loading /> : (
            <>
                {alerta.msg && <Alerta alerta={alerta} />}
                <div className='flex justify-between items-center bg-white shadow rounded-md p-3'>
                    <h1 className='font-black text-4xl text-center text-sky-600'> {nombre}</h1>
                    <div className='flex flex-col gap-2'>
                        {admin && (
                            <div className='flex items-center gap-2 text-sky-600 hover:text-sky-800 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                                <Link to={`/proyectos/editar/${params.id}`} className='uppercase font-bold'>Editar</Link>
                            </div>
                        )}
                        {admin && (
                            <div className='flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                <button type='button' className='uppercase font-bold' onClick={() => eliminarProyecto(params.id)}>
                                    Eliminar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {admin && (
                    <button className='flex gap-3 items-center justify-center w-full md:w-auto mt-6 bg-sky-400 px-5 py-3 rounded-lg text-white text-center text-sm font-bold uppercase m-auto' onClick={handleSetModalTarea}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Agregar Tarea
                    </button>
                )}

                <p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>
                <div className='flex justify-center'>
                    <div className='md:w-1/2 lg:w-1/3'>
                        {alerta.msg && <Alerta alerta={alerta} />}
                    </div>
                </div>
                <div className='bg-white rounded-lg shadow mt-10'>
                    {proyecto.tareas?.length ? (
                        proyecto.tareas?.map((tarea) => (
                            <Tarea key={tarea._id} tarea={tarea} />
                        ))
                    ) : (
                        <p className='text-center my-4 p-4 uppercase text-red-500 font-bold text-lg'>
                            No hay Tareas en este Proyecto
                        </p>
                    )}
                </div>
                {admin && (
                    <div className='flex justify-between items-center mt-10'>
                        <p className='font-bold text-xl'>Colaboradores</p>
                        <div className='flex items-center gap-2 text-lime-600 hover:text-lime-800 cursor-pointer mr-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`} className='uppercase font-bold'>Añadir</Link>
                        </div>
                    </div>
                )}
                <div className='bg-white rounded-lg shadow mt-10'>
                    {proyecto.colaboradores?.length ? (
                        proyecto.colaboradores?.map((colaborador) => (
                            <Colaborador key={colaborador._id} colaborador={colaborador} />
                        ))
                    ) : (
                        <p className='text-center my-4 p-4 uppercase text-red-500 font-bold text-lg'>
                            No hay Colaboradores en este Proyecto
                        </p>
                    )}
                </div>
                <Modal />
                <ModalEliminarTarea />
                <ModalEliminarColaborador />
            </>
        )
    );
}

export default Proyecto;