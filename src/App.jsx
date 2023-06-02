import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/Auth.Layout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ForgotPassword from './pages/ForgotPassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import Proyectos from './pages/Proyectos'
import NuevoProyecto from './pages/NuevoProyecto'
import Proyecto from './components/Proyecto'
import EditarProyecto from './pages/EditarProyecto'


import { AuthProvider } from './context/AuthProvider'
import {ProyectosProvider} from './context/ProyectosProvider'
import NuevoColaborador from './pages/NuevoColaborador'


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path='/registrar' element={<Registrar />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/forgot-password/:token' element={<NuevoPassword />} />
              <Route path='/confirmar/:token' element={<ConfirmarCuenta />} />
            </Route>
            <Route path='/proyectos' element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path='crear-proyecto' element={<NuevoProyecto />} />
              <Route path=':id' element={<Proyecto />} />
              <Route path='editar/:id' element={<EditarProyecto />} />
              <Route path='nuevo-colaborador/:id' element={<NuevoColaborador />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
