import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

function FormularioColaborador() {
    const [email, setEmail] = useState('');

    const { alerta, handleSetAlerta, submitColaborador } = useProyectos();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === '') {
            handleSetAlerta({
                msg: 'El email es Obligatorio',
                error: true
            })
            return
        }
        submitColaborador(email)
    }

    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
                {alerta.msg && <Alerta alerta={alerta} />}
                <label htmlFor="email" className='text-gray-700 uppercase text-sm  font-bold'>Email Colaborador</label>
                <input type="email" id='email' className='border-2 rounded-md placeholder-gray-200 p-2 mt-2 w-full' placeholder='Email Colaborador' value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <input type="submit" value={'Buscar Colaborador'} className='w-full text-white bg-sky-600 hover:bg-sky-800 transition-colors uppercase font-bold cursor-pointer rounded p-3 text-center text-sm' />
        </form>
    );
}

export default FormularioColaborador;