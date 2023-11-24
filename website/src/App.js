import './App.css';
import {Routes,Route} from "react-router-dom";
import Heading from './Head';
import Contact from './Contact';
import Forming from './form';
import About from './about';
import Adminlogin from './admin';
import Admin from './adminpage';
import Entry from './api';
import Menuvalue from './view';
import Register from './registeration';
import Login from './login';
function App() {
  return (
   <Routes>
    <Route path='/' element={<Register />} />
    <Route path='/Login' element={<Login />} />
    <Route path='/Mainpage' element={<Heading />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/booking' element={<Forming />} />
    <Route path='/about' element={<About />} />
    <Route path='/adminlogin' element={ <Adminlogin />} />
    <Route path='/Data' element={<Admin/>} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/setData' element={<Entry/>} />
    <Route path='/viewmenu' element={<Menuvalue />} />
  </Routes>
  );
}

export default App;
