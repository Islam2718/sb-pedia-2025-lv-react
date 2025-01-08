import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import Sidebar from '../UserPage/Siderbar';

interface FormData {
  email: string;
  // old_password: string;
  new_password: string;
  confirm_password: string;
}

export default function Dashboard() {
  const userInfoString = localStorage.getItem('userInfo');
  const [formData, setFormData] = useState<FormData>({
    email: userInfoString ? JSON.parse(userInfoString).email : '',
    // old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(config.API_URL_LIVE + 'change-password', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(response.status === 200) {
        setSuccessMessage(true);
        setLoading(false);
        setErrorMessage(false);
        // formData.new_password = '500';
        // formData.confirm_password = '500';
        window.location.replace('/settings');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      setErrorMessage(true);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='product-page'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3 d-none d-sm-block'>
              <Sidebar />
            </div>
            <div className='col-md-9'>
              <div className='product-card-area'>
                <div className='d-flex justify-content-between w-100 flex-sm-nowrap flex-wrap'>
                  <p className='search-reasult mt-3'>
                    <span className='fw-bold h5'><i className="fa fa-user" aria-hidden="true"></i> সেটিংস</span>
                  </p>
                </div>
                <div className="profile-detail mt-3 p-4 text-center">
                  <form className="col-md-8 col-lg-8 col-sm-12 mx-auto" onSubmit={handleSubmit}>
                    <h3>পাসওয়ার্ড সেটিং</h3>
                    <div className="modal-body text-start">
                      {errorMessage && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                          <span className='small'>দুঃখিত! আপনার পাসওয়ার্ড / কন্ফার্ম পাসওয়ার্ড টি ভুল </span>
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                          </button>
                        </div>
                      )}
                      {successMessage && (
                        <div className="alert alert-info alert-dismissible fade show" role="alert">
                          <span className='small'> আপনার পাসওয়ার্ড টি সফলভাবে পরিবর্তন হয়েছে !</span>
                          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                          </button>
                        </div>
                      )}
                      <div className="mb-2 d-none">
                        <label htmlFor="email" className="col-form-label">Email</label>
                        <input type="email" className="form-control input-design w-100" id="email" name="email" value={formData.email} onChange={handleChange} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="old_password" className="col-form-label">পুরাতন পাসওয়ার্ড :</label>
                        <input type="password" className="form-control input-design w-100" id="old_password" name="old_password" required/>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="new_password" className="col-form-label">নতুন পাসওয়ার্ড</label>
                        <input type="password" className="form-control input-design w-100" id="new_password" name="new_password" value={formData.new_password} onChange={handleChange} />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="confirm_password" className="col-form-label">কনফার্ম নতুন পাসওয়ার্ড</label>
                        <input type="password" className="form-control input-design w-100" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-center">
                      <button type="submit" className="btn btn-edit" disabled={loading}>পাসওয়ার্ড পরিবর্তন করুন </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
