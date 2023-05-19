import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function RutaProtegida() {
    const {auth, loading} = useAuth();
    return (
        <>
            {auth._id ? (
                <div className="bg-gray-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="p-10 flex-1 ">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to={'/'}/>}
        </>
    );
}

export default RutaProtegida;