import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import HomeCategory from "./Pages/HomeCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mens' element={<HomeCategory category="men" banner={men_banner}/>}/>
          <Route path='/womens' element={<HomeCategory category="women" banner={women_banner}/>}/>
          <Route path='/kids' element={<HomeCategory category="kid" banner={kid_banner}/>}/>
          <Route path='/product' element={<Product/>}>  
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes> 
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
