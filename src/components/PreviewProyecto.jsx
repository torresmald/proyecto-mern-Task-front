import { Link } from "react-router-dom";
function PreviewProyecto({ proyecto }) {
    const { nombre, _id, cliente } = proyecto;
    return (
        <div className="border-b p-5 flex">
            <p className="flex-1 font-bold">{nombre} <span className="text-gray-600 uppercase ml-5"> {cliente} </span></p>
            <Link to={`${_id}`} className="text-sky-600 hover:text-sky-800 uppercase font-bold text-sm">Ver Proyecto</Link>
        </div>
    );
}

export default PreviewProyecto;