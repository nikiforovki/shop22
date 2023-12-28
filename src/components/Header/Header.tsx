import React, { Component } from 'react'
import { Navbar, Container, Nav, Form } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Home from '../Pages/Home.tsx'
import Profile from '../Pages/Profile/Profile.tsx'
// import Catalog from '../Pages/Catalog'
import Login from '../Pages/loginPage/Login.tsx'
import Product from '../Pages/Product/Product.tsx'
import './Header.css';



export default class Header extends Component {
 render() {
  return (
   <div className="header">
 <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
 <a className="navbar-brand" href="#">E-shop</a>
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
   <span className="navbar-toggler-icon"></span>
 </button>
 <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
   <div className="navbar-nav">
   <a className="nav-item nav-link" href="/home">Home</a>     
     {/* <a class="nav-item nav-link" href="/catalog">Catalog</a> */}
     <a className="nav-item nav-link" href="/profile">Profile</a>
     <a className="nav-item nav-link" href="/login">Login</a>
     <a className="nav-item nav-link" href="/Product">Product</a>
     
   </div>
 </div>
</nav>
   <Router>
     <Routes>
     <Route path="/home" element={<Home/>}/>
     {/* <Route exact path="/catalog" element={<Catalog/>}/> */}
     <Route path="/profile" element={<Profile/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/Product" element={<Product/>}/>
     </Routes>
   </Router>
   </div>
  )
 }
}
























// Работает 
// import React from 'react';
// import './Header.css'; // Импортируем CSS-файл для стилизации
// import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
// import Home from '../Pages/Home.tsx'
// import { Profile } from '../Pages/Profile/Profile.tsx'
// import Catalog from '../Pages/Catalog'
// import Login from '../Pages/loginPage/Login.tsx'
// import Product from '../Pages/Product/Product.tsx'


// interface Props {}

// const Header: React.FC<Props> = () => {
//  return (
//  <header className="header">
//    <nav>
//      <div className="logo">E-shop</div>
//      <ul className="menu">
//        <li><a href="/Home">Главная</a></li>
//        <li><a href="/Catalog">Каталог</a></li>
//        <li><a href="/Profile">Профиль</a></li>
//        <li><a href="/Login">Логин</a></li>
//      </ul>
//    </nav>
//  </header>
//  );
// }

// export default Header;
