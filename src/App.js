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
     
    </Routes>
    </BrowserRouter>
  );
}

export default App;
