import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import axios from 'axios';
import useAuth from "../hooks/useAuth";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const {handleSetAuth} = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son Obligatorios',
                error: true
            })
            return
        }
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, {email, password})
            setAlerta({})
            localStorage.setItem('token', data.token)
            handleSetAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error:true
            })
        }
    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center ">Inicia Sesión y Administra <span className="text-slate-700">Proyectos</span></h1>
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>

            {alerta.msg && <Alerta alerta={alerta}/>}
                <div className="my-5 ">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="my-5 ">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
            <input type="submit" value={'Iniciar Sesión'} className="bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors mt-3 mb-5" />
            </form>
            <nav className="lg:flex lg:justify-between ">
                <Link to={'registrar'} className="block text-center my-5 text-slate-500 uppercase  text-sm">
                    ¿No tienes cuenta? Regístrate
                </Link>
                <Link to={'forgot-password'} className="block text-center my-5 text-slate-500 uppercase text-sm">
                   Olvidé mi Password
                </Link>
            </nav>
        </>
    );
}

export default Login;