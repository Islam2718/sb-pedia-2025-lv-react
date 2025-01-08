import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import config from '../../config';
// interface Profile {
//     id: number;
//     name: string;
//     email: string;
//     phone: string;
//     firstname: string;
//     lastname: string;
//     profile_img: string;
//     type: string;
//     national_id_no: string;
//     address: string;
//     facebook_id: string;
//     google_id: string;
//   };
export default function Dashboard() {
    const location = useLocation();
    const isActive = location.pathname;
    // console.log('_acMenu', isActive);

    const userInfoString = localStorage.getItem('userInfo');

    // Parse the userInfoString to convert it back to an object
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    
    // Function to handle form submission   
    useEffect(() => {
        // console.log('userInfo', userInfo);
    }) 

    const handleLogout = async () => {
        // CALLING API WITH AXIOS 
        try {
          const response = await axios.post(config.API_URL_LIVE + config.LOGOUT_URL, null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });;      
          //setLogin(response.data); // Assuming the API response contains the response;
    
          if(response.status === 200){
            // setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
          }
          
          window.location.replace('/login');
    
          // Redirect or do something else after successful login
        } catch (error) {
          console.error('Error logging in:', error);
        }    
      };
  return (
    <div>
        <div className='sidebar'>
            <div className='sidebar-card-area'>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                        <h5 className="accordion-header text-center pt-3 fw-bold body-text-color">
                        <span>{userInfo?.firstname + ' ' + userInfo?.lastname}</span>                
                        </h5>                                
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                            <div className="accordion-body">                                        
                                <div className='category profile-allinfo'>
                                    <ul className='list-unstyled category-link'>
                                        <li>
                                            <Link to='/dashboard' className={`link-text ${isActive === '/dashboard' ? 'ghaat-active-btn' : ''}`}>ড্যাশবোর্ড</Link>
                                        </li>
                                        {/* <li> <hr className="dropdown-divider" /></li> */}
                                        <li>
                                            <Link to='/ads' className={`link-text ${isActive === '/ads' ? 'ghaat-active-btn' : ''}`}>পোস্ট সমূহ</Link>
                                        </li>
                                        {/* <li>
                                            <Link to='/message' className={`link-text ${isActive === '/dashboard' ? 'ghaat-active-btn' : ''}`}>মেসেজ</Link>
                                        </li>                                                 */}
                                        <li>
                                            {/* <Link to='/transaction' className={`link-text ${isActive === '/dashboard' ? 'ghaat-active-btn' : ''}`}>ট্রানজেকশন</Link> */}
                                        </li>                                                
                                        {/* <li> <hr className="dropdown-divider" /></li> */}
                                        <li>
                                            <Link to='/profile' className={`link-text ${isActive === '/profile' ? 'ghaat-active-btn' : ''}`}>প্রোফাইল </Link>
                                        </li>
                                        <li>                                                  
                                            <button type='button' onClick={handleLogout} className='link-text text-danger btn p-0 '>লগআউট</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </div>                           
            </div>
            <a href="https://grameencheck.com/" target="_blank" rel="noreferrer">
                <div className='sidebar-call-to-action mt-3'>
                    <img src="/images/call-to-acctio4.webp" alt="n/a" className='img-fluid mb-3'/>
                </div>
            </a>
            </div>
        </div>
    </div>
  )
}
