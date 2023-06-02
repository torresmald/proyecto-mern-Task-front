import useProyectos from "./useProyectos";
import useAuth from "./useAuth";

const useAdmin = () => {
    const {auth} = useAuth();
    const {proyecto} = useProyectos();

    return auth._id === proyecto.creador
}

export default useAdmin;