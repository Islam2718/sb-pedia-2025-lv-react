import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
interface FormData {
  firstname: string;
  lastname: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  password_confirmation: string;
  type: string;
}
export default function Registration() {
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: '',
    type: 'USER', 
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      name: `${prevFormData.firstname} ${prevFormData.lastname}`,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      // Assuming you have an API endpoint to which you want to send the form data
      const response = await axios.post(config.API_URL_LIVE + config.REGISTER_URL, {
        ...formData,
      });   
      // Handle successful response  
      // Check if there is an error related to the type
         // Check if there is an error related to the type
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      const access_token = localStorage.getItem('token');
      console.log(access_token);
      // Fetch user info
      const userInfoResponse = await axios.get(config.API_URL_LIVE + config.USER_URL, {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      // Store user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data.data));
      console.log('Local storage user info', localStorage.getItem('userInfo'));
      window.location.replace('/dashboard');
    } catch (error) {
      // Handle error
      console.error('Error submitting form data:', error);
      setErrorMessage(true);
      setLoading(false);
    }
  };
  
  return (
    <div>
         <div className="registration-page ">
          <div className="container col-md-3 col-lg-4 col-sm-12">
            <div className="reg-form">
                <p className="heading-text-center text-center pt-3">রেজিস্ট্রেশন</p>
                <div className="heading-border text-center"></div>
                <div className="reg-form">                
                {errorMessage && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <span className='small'>দুঃখিত! আপনার ইমেইল অথবা পাসওয়ার্ড ও কন্ফার্ম পাসওয়ার্ড টি ভুল </span> 
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                    </button>
                  </div>
                )}
                <form className="row g-4" onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control input-design"
                      placeholder="প্রথম নাম"
                      name="firstname"
                      value={formData.firstname}                     
                      onChange={handleChange}
                      
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control input-design"
                      placeholder="শেষ নাম"
                      name="lastname"
                      value={formData.lastname}                     
                      onChange={handleChange}
                      
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="email"
                      className="form-control input-design"
                      placeholder="ইমেইল *"
                      name="email"
                      value={formData.email}                     
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control input-design"
                      placeholder="ফোন*"
                      name="phone"
                      value={formData.phone}                     
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control input-design"
                      placeholder="ঠিকানা"
                      name="address"
                      value={formData.address}                     
                      onChange={handleChange}                      
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className="form-control input-design"
                      placeholder="পাসওয়ার্ড*"
                      name="password"
                      value={formData.password}                     
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="password"
                      className="form-control input-design"
                      placeholder="কন্ফার্ম পাসওয়ার্ড*"
                      name="password_confirmation"
                      value={formData.password_confirmation}                     
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 px-5 form-check">
                      <input type="checkbox" className="form-check-input" id="terms-and-condition" required/>
                      <label className="form-check-label" htmlFor="terms-and-condition">আমি <b>গ্রামীন ই-হাট</b> এর <Link to="/login" className="link-text">শর্তাবলী এবং নীতিমালা </Link> গুলো মনোযগ সহকারে পড়েছি এবং গ্রহণ করছি । </label>
                  </div> 
                  <div className="login-btn text-center pb-4">
                    <button type="submit" className="btn btn-theme px-5">                       
                    {
                      loading && loading? (
                        <div className="spinner-border spinner-border-sm text-white" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <>রেজিস্টার</>
                      )
                    }                        
                    </button>
                  </div>
                </form>
                <p className='pb-5 pt-3 text-center'>
                    ইতিমধ্যে একটি অ্যাকাউন্ট আছে |{' '}
                    <Link to="/login" className="link-text">
                      লগইন
                    </Link>
                  </p>
                </div>
            </div>             
          </div>
        </div>
    </div>
  )
}
