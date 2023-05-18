import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Alerta from "../components/Alerta";

function NuevoPassword() {
    const params = useParams();
    const { token } = params;
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState('');
    const [passwordModificado, setPasswordModificado] = useState(false);
    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/forgot-password/${token}`)
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    error: true,
                    msg: error.response.data.msg
                })
            }
        }
        return () => comprobarToken()
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password.length < 6) {
            setAlerta({
                error: true,
                msg: 'Agrega al menos 6 carácteres'
            })
            return
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/forgot-password/${token}`
            const { data } = await axios.post(url, { password })
            setAlerta({
                error: false,
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            console.log(error);
            setAlerta({
                error: true,
                msg: error.response.data.msg
            })
        }
    }
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center ">Escribe tu nuevo Password  y accede a <span className="text-slate-700">Proyectos</span></h1>
            {alerta.msg && <Alerta alerta={alerta} />}
            {tokenValido && (
                <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                    <div className="my-5 ">
                        <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                        <input type="password" id="password" placeholder="Escribe tu nuevo Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <input type="submit" value={'Enviar nuevo Password'} className="bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors mt-3 mb-5" />
                </form>
            )}
            {passwordModificado && (
                <Link to={'/'} className="block text-center my-5 text-slate-500 uppercase  text-sm">
                    Inicia Sesión
                </Link>
            )}
        </>
    );
}

export default NuevoPassword;