import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/Auth.Layout'
import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ForgotPassword from './pages/ForgotPassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuenta from './pages/ConfirmarCuenta'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path='/registrar' element={<Registrar />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/forgot-password/:token' element={<NuevoPassword />} />
          <Route path='/confirmar/:token' element={<ConfirmarCuenta />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
