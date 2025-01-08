import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

import Home from './Views/HomePage/Home';
import Product from './Views/ProductPage/Product';

import GhrmClients from './Views/GhrmClients/Clients';
import MicfinaClients from './Views/MicfinaClients/Clients';
import GbankerClients from './Views/GbankerClients/Clients';

import Page from './Views/Page/Page';
import ProductDetails from './Views/ProductPage/ProductDetails';
import Login from './Views/AuthPage/Login';
import Registration from './Views/AuthPage/Registration';
import Forget from './Views/AuthPage/Forget';
import Dashboard from './Views/UserPage/Dashboard';
import Profile from './Views/UserPage/Profile';
import Settings from './Views/UserPage/Settings';
import Ads from './Views/UserPage/Ads';
import Message from './Views/UserPage/Message';
import Transaction from './Views/UserPage/Transaction';
import AdsForm from './Views/UserPage/AdsForm';


// Custom PrivateRoute component to handle authentication logic
const isLoggedIn = localStorage.getItem('token') && localStorage.getItem('userInfo');
function App() {
  return (
    <Router>
      <div>
        <Header />
          <Routes>
          {/* <Route {...({ exact: true, path: '/', component: Home } as RouteProps)} /> */}
        {/* <Routes{...({ exact: true, path: '/', component: Home } as RouteProps)} /> */}
          <Route path='/' Component={Home} />
          <Route path='/product/:id?' Component={Product} />
          <Route path='/ghrm-clients' Component={GhrmClients} />
          <Route path='/micfina-clients' Component={MicfinaClients} />
          <Route path='/gbanker-clients' Component={GbankerClients} />
          <Route path='/product_details/:id?' Component={ProductDetails} />
          <Route path='/page/:id?' Component={Page} />
           {/* Private route for dashboard */}
          <Route path='/login' element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path='/registration' element={!isLoggedIn ? <Registration /> : <Navigate to="/dashboard" />} />
          <Route path='/forget-password' element={!isLoggedIn ? <Forget /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/ads" element={isLoggedIn ? <Ads /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/message" element={isLoggedIn ? <Message /> : <Navigate to="/login" />} />
          <Route path="/transaction" element={isLoggedIn ? <Transaction /> : <Navigate to="/login" />} />
          <Route path="/ads-form/:id?" element={isLoggedIn ? <AdsForm /> : <Navigate to="/login" />} />          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
