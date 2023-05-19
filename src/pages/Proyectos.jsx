import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";

function Proyectos() {
    const {proyectos} = useProyectos();
    return (
        <>
            <h1 className='text-4xl font-black'>Proyectos</h1>
            <div className="bg-white rounded-lg shadow mt-10">
                {proyectos.length ? proyectos.map((proyecto) => (
                    <PreviewProyecto key={proyecto._id} proyecto={proyecto}/>
                )) : <p className="text-center bg-gray-300 uppercase font-bold shadow rounded-lg p-3">No hay proyectos Aún</p>}
            </div>
        </>
    );
}

export default Proyectos;