import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true)
    const [modalTarea, setModalTarea] = useState(false);
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)


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
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tareas`, tarea,  config)
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas = [...proyecto.tareas, data];
            setProyecto(proyectoActualizado);
            setModalTarea(false);
            setAlerta({})
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
        const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea.id}`, tarea,  config)
        const proyectoActualizado = {...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) => tareaState._id === data._id ? data : tareaState)
        setProyecto(proyectoActualizado)
        setTarea(data)
        setAlerta({})
        setModalTarea(false);
    }
    const submitTarea = async (tarea) => {
        if(tarea.id) {
            await editarTarea(tarea)
        } else{
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
            const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tareas/${tarea._id}`, config)
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas = proyectoActualizado.tareas.filter((tareaState) => tareaState._id !== tarea._id)
            setProyecto(proyectoActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTarea({})
            setModalEliminarTarea(false)
            setTimeout(() => {
                setAlerta({})
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <ProyectosContext.Provider value={{
            proyectos, handleSetAlerta, alerta, submitProyecto, obtenerProyecto, proyecto, cargando, eliminarProyecto, handleSetModalTarea, modalTarea, submitTarea, handleSetEditarTarea, tarea, handleSetEliminarTarea, modalEliminarTarea, eliminarTarea
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;
