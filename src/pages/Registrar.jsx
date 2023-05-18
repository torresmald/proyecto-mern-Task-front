import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Alerta from '../components/Alerta';

function Registrar() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ([nombre, email, password, repetirPassword].includes('')) {
            setAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }
        if (password !== repetirPassword) {
            setAlerta({
                msg: 'Los Passwords no coinciden',
                error: true
            })
            return
        }
        if (password.length < 6) {
            setAlerta({
                msg: 'Agrega al menos 6 carácteres',
                error: true
            })
            return
        }
        setAlerta({})
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, { nombre, email, password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setNombre('');
            setEmail('');
            setPassword('');
            setRepetirPassword('');
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center ">Crea tu Cuenta  y Administra <span className="text-slate-700">Proyectos</span></h1>
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                {alerta.msg && <Alerta alerta={alerta} />}
                <div className="my-5 ">
                    <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                    <input type="text" id="nombre" placeholder="Tu Nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </div>
                <div className="my-5 ">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="my-5 ">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input type="password" id="password" placeholder="Password de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <div className="my-5 ">
                    <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
                    <input type="password" id="password2" placeholder="Repite el Password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={repetirPassword} onChange={(event) => setRepetirPassword(event.target.value)} />
                </div>
                <input type="submit" value={'Crear Cuenta'} className="bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors mt-3 mb-5" />
            </form>
            <nav className="lg:flex lg:justify-between ">
                <Link to={'/'} className="block text-center my-5 text-slate-500 uppercase  text-sm">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
                <Link to={'forgot-password'} className="block text-center my-5 text-slate-500 uppercase text-sm">
                    Olvidé mi Password
                </Link>
            </nav>
        </>
    );
}

export default Registrar;