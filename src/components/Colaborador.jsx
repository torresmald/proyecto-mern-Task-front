import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
function Colaborador({ colaborador }) {
    const { nombre, email } = colaborador;
    const { handleSetModalEliminarColaborador } = useProyectos();
    const admin = useAdmin()

    return (
        <>

            {admin && (
                <div className="border-b p-5 flex justify-between items-center">
                    <div>
                        <p>{nombre}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                    <div>
                        <button type="button" className="bg-red-600 px-4 py-3 text-white font-bold rounded-md uppercase text-xs" onClick={() => handleSetModalEliminarColaborador(colaborador)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Colaborador;