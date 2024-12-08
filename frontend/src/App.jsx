// import './App.css'
import { Route,BrowserRouter,Routes , Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Form'
import Navbar from './components/NavBar';
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
   
  );
}
