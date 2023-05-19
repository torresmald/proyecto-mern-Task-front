import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [proyecto, setProyecto] = useState({});
    const [alerta, setAlerta] = useState({});
    const [cargando, setCargando] = useState(true)


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
                const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, config)
                setProyectos(data)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerProyectos()
    }, [])

    const submitProyecto = async (proyecto) => {
        const token = localStorage.getItem('token');
        if (!token) return

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos`, proyecto, config)
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
            const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/proyectos/${id}`, config)
            setProyecto(data.proyecto)
        } catch (error) {
            console.log(error);
        }
        setCargando(false);
    }

    return (
        <ProyectosContext.Provider value={{
            proyectos, handleSetAlerta, alerta, submitProyecto, obtenerProyecto, proyecto, cargando
        }}>
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;
