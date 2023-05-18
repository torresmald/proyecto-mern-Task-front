import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Alerta from "../components/Alerta";


function ConfirmarCuenta() {
    const [alerta, setAlerta] = useState({});
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

    const params = useParams();
    const { token } = params;
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirmar/${token}`);
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                setCuentaConfirmada(true)
            }
            catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        return () => {confirmarCuenta()}
    }, [])

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl text-center ">Confirma tu Cuenta y accede a <span className="text-slate-700">Proyectos</span></h1>
            <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white ">
                {alerta && <Alerta alerta={alerta} />}
                {cuentaConfirmada && (
                    <Link to={'/'} className="block text-center my-5 text-slate-500 uppercase  text-sm">
                        Inicia Sesión
                    </Link>
                )}
            </div>
        </>
    );
}

export default ConfirmarCuenta;