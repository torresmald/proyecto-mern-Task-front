import { Link } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import useAuth from "../hooks/useAuth";
import Busqueda from "./Buscador";
function Header() {
    const { handleBuscador, cerrarSesionProyectos } = useProyectos();
    const { cerrarSesionAuth } = useAuth();

    const handleCerrarSesion = () => {
        cerrarSesionProyectos()
        cerrarSesionAuth();
        localStorage.removeItem('token')
    }
    return (
        <header className="px-4 py-5 bg-white border-b ">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">Task</h2>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                    <button type="button" className="font-bold uppercase" onClick={handleBuscador}>
                        Buscar Proyecto
                    </button>
                    <Link to={'/proyectos'} className="font-bold uppercase">Proyectos</Link>
                    <button className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold" type="button" onClick={handleCerrarSesion}>Cerrar Sesión</button>
                </div>
            </div>
            <Busqueda />
        </header>
    );
}

export default Header;