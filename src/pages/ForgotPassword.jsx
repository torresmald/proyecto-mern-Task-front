import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from '../components/Alerta';
import axios from "axios";

function ForgotPassword() {
    const [alerta, setAlerta] = useState({});
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (email === '' || email.length < 5) {
            setAlerta({
                msg: 'El email es obligatorio',
                error: true
            })
            return
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/forgot-password/`, { email })
            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center ">Recupera tu cuenta y tus  <span className="text-slate-700">Proyectos</span></h1>
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                {alerta.msg && <Alerta alerta={alerta} />}
                <div className="my-5 ">
                    <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input type="email" id="email" placeholder="Email de Registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" value={email} onChange={event => setEmail(event.target.value)} />
                </div>

                <input type="submit" value={'Enviar Correo Recuperación'} className="bg-sky-700 py-3 text-white uppercase font-bold rounded w-full hover:cursor-pointer hover:bg-sky-800 transition-colors mt-3 mb-5" />
            </form>
            <nav className="lg:flex lg:justify-between ">
                <Link to={'/'} className="block text-center my-5 text-slate-500 uppercase  text-sm">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
                <Link to={'registrar'} className="block text-center my-5 text-slate-500 uppercase  text-sm">
                    ¿No tienes cuenta? Regístrate
                </Link>
            </nav>
        </>
    );
}

export default ForgotPassword;