import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import config from '../config'
import axios from 'axios';
interface SiteInfo {
  name: string;
  description: string;
  logo: string;
  title: string;
  icon: string;
  email: string;
  phone: string;
  address: string;
  web_url: string;
  map_html: string;
  copyright_text: string;
}
export default function Header(): JSX.Element {
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const response = await axios.get<{ data: SiteInfo }>(config.API_URL_LIVE+'siteinfo');
        setSiteInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching site info:', error);
      }
    };
    fetchSiteInfo();
  }, []);
  useEffect(() => {
    handleLogin();
  }, []);
  const userInfoString = localStorage.getItem('userInfo');
  const token = localStorage.getItem('token');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const handleLogin = () => {
    if (userInfo !== null && token !== null) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    }
    else {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
    }
  };

  const handleLogout = async () => {
    try {
      console.log(token);
      const response = await axios.post(config.API_URL_LIVE + config.LOGOUT_URL, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.status === 200){
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      }
      window.location.replace('/login');
    } catch (error) {
      console.error('Error logging in:', error);
    }    
  };
  return (
    <div className='header-area'>
      {siteInfo && (
      <div className='container'>
        <div className='header d-flex justify-content-between py-2'>
          <div className='header-text'>
            <Link to='/' className='d-flex'>
            {/* <img className="img-fluid" src="images/logo.png" alt="" /><span className="navbar-brand ps-2 fw-semibold">Grameen e-Haat</span> */}
            <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" /><span className="navbar-brand ps-2 fw-semibold d-none d-sm-flex align-items-center">{siteInfo.name}</span>
            </Link>
          </div>
          <div className='header-icon'>
          <div className="user-section mt-1">
            <Link to="../ads-form" className="btn btn-theme" type="submit">+ বিজ্ঞাপন যুক্ত করুন </Link>
              {/* <i className="fa fa-user"></i> */}
              {isLoggedIn ? (                      
                  <div className="user-icon">
                    <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img  src={`${process.env.PUBLIC_URL}/images/user.png`} alt="n/a" className='img-fluid' />
                    </button>  
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <div className="text-center profile-box px-3">
                        <small>{userInfo?.firstname + ' ' +userInfo?.lastname}</small><br/>
                        <small>{userInfo?.email}</small><br/>
                        <small>{userInfo?.phone}</small>
                      </div>
                      <li> <hr className="dropdown-divider" /></li>                           
                      <li> <a href="/profile"><i className="fa fa-user"></i> প্রোফাইল</a></li>
                      <li> <a href="/settings"><i className="fa fa-cog"></i> সেটিং</a></li>
                      <li> <a href="/dashboard"><i className="fa fa-dashboard"></i> ড্যাশবোর্ড</a></li>                            
                      <li> <hr className="dropdown-divider" /></li>
                      <li> <button onClick={handleLogout} className="dropdown-logout"><i className="fa fa-sign-out"></i> লগআউট</button></li>
                    </ul>
                  </div>
              ) : (
                <> <Link className="btn btn-theme-yellow ms-2 me-2" to={'/login'} type="submit">লগইন</Link></>
              )}
            </div> 
          </div>          
        </div>
      </div>
      )}
    </div>
  );
}