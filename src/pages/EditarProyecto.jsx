import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import Loading from "../components/Loading";
import FormularioProyecto from "../components/FormularioProyecto";

function EditarProyecto() {
    const params = useParams();
    const { obtenerProyecto, proyecto, cargando } = useProyectos();
    const { nombre } = proyecto
    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    return (
        cargando ? <Loading /> : (
            <>
                <h1 className='font-black text-4xl' >Editar Proyecto: {nombre}</h1>
                <div className="mt-10 flex justify-center">
                    <FormularioProyecto />
                </div>
            </>
        )


    );
}

export default EditarProyecto;