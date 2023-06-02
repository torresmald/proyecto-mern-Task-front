import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
function PreviewProyecto({ proyecto }) {
    const {auth} = useAuth();
    const { nombre, _id, cliente, creador } = proyecto;
    
    return (
        <div className="border-b p-5 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2">
                <p className="flex-1 font-bold">{nombre} <span className="text-gray-600 uppercase ml-5"> {cliente} </span></p>
                {auth._id !== creador && (
                    <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">Colaborador</p>
                )}
            </div>
            <Link to={`${_id}`} className="text-sky-600 hover:text-sky-800 uppercase font-bold text-sm">Ver Proyecto</Link>
        </div>
    );
}

export default PreviewProyecto;