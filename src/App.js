import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import Consumer from './pages/Consumer';
import ConsumerContextProvider from './context/ConsumerContextAPI';
import Authmiddleware from './middleware/authmiddleware';
import Forgetpassword from './pages/Forgetpassword';
import Resetpassword from './pages/Resetpassword';
import AdminDashboard from './pages/dashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminReset from './pages/AdminReset';
import AdminAuthmiddleware from './middleware/adminmiddleware';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/resetpassword' element={<Resetpassword/>}/>
      <Route path='/forgetpassword' element={<Forgetpassword/>}/>
      <Route path='/consumer' element={<ConsumerContextProvider>
    
       <Authmiddleware>
       <Consumer/>
       </Authmiddleware>
      </ConsumerContextProvider>}></Route>
      <Route path='/dashboard' element={<AdminAuthmiddleware>
        <AdminDashboard/>
      </AdminAuthmiddleware>}/>
      <Route path='/adminLogin' element={<AdminLogin/>}/>
      <Route path='/adminRegister' element={<AdminRegister/>}/>
      <Route path='/adminReset' element={<AdminReset/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
