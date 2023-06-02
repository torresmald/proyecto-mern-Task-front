import FormularioColaborador from "../components/FormularioColaborador";
import Loading from "../components/Loading";
import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function NuevoColaborador() {
    const {obtenerProyecto, proyecto, colaborador, cargando, agregarColaborador} = useProyectos();
    const params = useParams();
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    return (
        <>
            <h1 className="text-4xl font-black">Añadir Colaborador al Proyecto: {proyecto.nombre} </h1>
            <div className="mt-10 flex justify-center">
                <FormularioColaborador />
            </div>
            {cargando ? <Loading /> : colaborador?._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow w-full">
                        <h2 className="text-center font-bold mb-6 text-2xl ">
                            Resultado:
                        </h2>
                        <div className="flex flex-col justify-between items-center">
                            <p className="mb-2 text-sky-600 font-bold">{colaborador.nombre}</p>
                            <button className="bg-lime-600 px-2 py-2 rounded-lg uppercase text-white font-bold text-sm" type="button" onClick={() => agregarColaborador({
                                email: colaborador.email
                            })}>
                                Agregar al Proyecto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NuevoColaborador;