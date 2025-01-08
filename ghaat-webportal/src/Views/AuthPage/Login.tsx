import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import config from '../../config';
import { Console } from 'console';
interface Loging {
  status: string
  token: string
}

export default function Login() {
  
  const [login, setLogin] = useState<Loging | null>(null); 
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;    
    console.log(email, password);
    try {
      setLoading(true);
      const response = await axios.post(config.API_URL_LIVE + config.LOGIN_URL, { email, password });      
      setLogin(response.data); // Assuming the API response contains the response;

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      const access_token = localStorage.getItem('token');
      // console.log(access_token);
      // Fetch user info
      const userInfoResponse = await axios.get(config.API_URL_LIVE + config.USER_URL, {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data.data));
      console.log('Local storage user info', localStorage.getItem('userInfo'));
      window.location.replace('/dashboard');

      // Redirect or do something else after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Local Storage Token:' + token);
  })
  return (
    <div>
        <div className="login-page ">
          <div className="container col-md-3">
            <div className='login-form'>
                <p className="heading-text-center text-center pt-4">লগইন </p>
                <div className="heading-border text-center"></div>
                <div className="reg-form">
                {errorMessage && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <span className='small'>দুঃখিত! আপনার ইমেইল অথবা পাসওয়ার্ডটি ভুল </span> 
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => setErrorMessage(false)}>
                    </button>
                  </div>
                )}
                  <form className="row g-4" onSubmit={handleSubmit}>
                    <div className="col-md-12">
                      <input type="email" name="email" className="form-control input-design" placeholder="ইমেইল*" />
                    </div>
                    <div className="col-md-12">
                      <input type="password" name="password" className="form-control input-design" placeholder="পাসওয়ার্ড*" />
                    </div>
                    <p className='m-0 my-2 mb-0'><Link to="/forget-password" className='link-text'>পাসওয়ার্ড ভুলে গেছেন?</Link></p>
                    <div className="login-btn text-center">
                      <button type="submit" className="btn btn-theme px-5">
                      {
                      loading && loading? (
                        <div className="spinner-border spinner-border-sm text-white" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>লগইন</>
                      )
                    }  
                      </button>
                    </div>
                    <p className='text-center pb-3'>অ্যাকাউন্ট নেই | <Link to="/registration" className='link-text'>অ্যাকাউন্ট তৈরি করুন</Link></p>
                  </form>
                </div>
            </div>
              
          </div>
        </div>
    </div>
  )
}
