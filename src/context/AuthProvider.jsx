import axios from "axios";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const consultarToken = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false)
                return
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`, config)
                setAuth(data);
            } catch (error) {
                setAuth({})
            }
            setLoading(false);
        }
        return () => consultarToken()
    }, [])


    const handleSetAuth = (datos) => {
        setAuth(datos)
    }

    const cerrarSesionAuth = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider value={{
            handleSetAuth, auth, loading, cerrarSesionAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext;