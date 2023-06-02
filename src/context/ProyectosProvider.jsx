import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';
let socket;

const ProyectosContext = createContext();
const ProyectosProvider = ({ children }) => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true)
    const [modalTarea, setModalTarea] = useState(false);
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false)
    const [buscador, setBuscador] = useState(false)




    const handleSetAlerta = (alerta) => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }
    useEffect(() => {
        const obtenerProyectos = async () => {
            const token = localStorage.getItem('token');
            if (!token) return
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, config)
                setProyectos(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [auth])
    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])
    const crearProyecto = async (proyecto) => {
        const token = localStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, proyecto, config)
            setProyectos([...proyectos, data])
            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.error,
                error: false
            })
        }
    }
    const editarProyecto = async (proyecto) => {
        const token = localStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${proyecto.id}`, proyecto, config)
            const proyectosActualizado = proyectos.map((proyectoState) => proyectoState._id === data._id ? data : proyectoState);
            setProyectos(proyectosActualizado)
            setAlerta({
                msg: 'Proyecto Editado Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.error,
                error: false
            })
        }
    }
    const eliminarProyecto = async (id) => {
        if (confirm('Deseas Eliminar')) {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config)
                const proyectosActualizados = proyectos.filter((proyectoState) => proyectoState._id !== id)
                setProyectos(proyectosActualizados)
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setTimeout(() => {
                    setAlerta({})
                    navigate('/proyectos')
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        }

    }
    const submitProyecto = async (proyecto) => {
        if (proyecto.id) {
            await editarProyecto(proyecto)
        } else {
            await crearProyecto(proyecto)
        }
    }
    const obtenerProyecto = async (id) => {
        setCargando(true)
        const token = localStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config)
            setProyecto(data.proyecto)
        } catch (error) {
            console.log(error);
        }
        setCargando(false);
    }
    const handleSetModalTarea = () => {
        setModalTarea(!modalTarea)
        setTarea({})
    }

    const crearTarea = async (tarea) => {
        const token = localStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea, config)

            setModalTarea(false);
            setAlerta({})

            socket.emit('agregarTarea', (data));

        } catch (error) {
            console.log(error);
        }
    }
    const editarTarea = async (tarea) => {
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`, tarea, config)

        setAlerta({})
        setModalTarea(false);

        socket.emit('editarTarea', data)
    }
    const submitTarea = async (tarea) => {
        if (tarea.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const handleSetEditarTarea = (tarea) => {
        setTarea(tarea)
        setModalTarea(true);
    }
    const handleSetEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    const eliminarTarea = async () => {
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`, config)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setModalEliminarTarea(false)
            socket.emit('eliminarTarea', data)

            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    const submitColaborador = async (email) => {
        setCargando(true)
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/buscarColaborador`, { email }, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
        setCargando(false)
        setTimeout(() => {
            setAlerta({})
        }, 2000);
    }
    const agregarColaborador = async (email) => {
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/agregarColaborador/${proyecto._id}`, email, config);
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setColaborador({})
        }
        setTimeout(() => {
            setAlerta({})
        }, 2000);
    }

    const handleSetModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)
    }
    const eliminarColaborador = async (colaborador) => {
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/eliminarColaborador/${proyecto._id}`, { id: colaborador._id }, config);
            const proyectoActualizado = { ...proyecto };

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter((colaboradorState) => colaboradorState._id !== colaborador._id)
            setProyecto(proyectoActualizado);
            setModalEliminarColaborador(false)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})


        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setColaborador({})
        }
        setTimeout(() => {
            setAlerta({})
        }, 2000);

    }

    const completarTarea = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/cambiarEstado/${id}`, {}, config)

            setTarea({})
            socket.emit('cambiarEstado', data)
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => {
            setAlerta({})
        }, 2000);
    }
    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    const submitTareasProyecto = (tarea) => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = [...proyectoActualizado.tareas, tarea];
        setProyecto(proyectoActualizado);
    }

    const deleteTareasProyecto = (tarea) => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter((tareaState) => tareaState._id !== tarea._id)
        setProyecto(proyectoActualizado)
    }

    const editarTareaProyecto = (tarea) => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
        setTarea(tarea)
    }

    const editarEstadoTarea = (tarea) => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) => tareaState._id === tarea._id ? tarea : tareaState)
        setProyecto(proyectoActualizado)
    }


    const cerrarSesionProyectos = () => {
        setProyectos([])
        setProyecto({})
        setAlerta({})

    }
    return (
        <ProyectosContext.Provider value={{
            proyectos, handleSetAlerta, alerta, submitProyecto, obtenerProyecto, proyecto, cargando, eliminarProyecto, handleSetModalTarea, modalTarea, submitTarea, handleSetEditarTarea, tarea, handleSetEliminarTarea, modalEliminarTarea, eliminarTarea, submitColaborador, colaborador, agregarColaborador, handleSetModalEliminarColaborador, modalEliminarColaborador, eliminarColaborador, completarTarea, handleBuscador, buscador, submitTareasProyecto, deleteTareasProyecto, editarTareaProyecto, editarEstadoTarea, cerrarSesionProyectos
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;
