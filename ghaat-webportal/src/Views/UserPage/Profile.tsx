import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import config from '../../config';
import Sidebar from '../UserPage/Siderbar';

interface Profile {
    id: number;
    name: string;
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    profile_img: string;
    type: string;
    national_id_no: string;
    address: string;
    facebook_id: string;
    google_id: string;
  };
export default function Dashboard() {
    const userInfoString = localStorage.getItem('userInfo');

    // Parse the userInfoString to convert it back to an object
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        phone : '',
        firstname : '',
        lastname : '',
        profile_img : '',
        type : '',
        national_id_no : '',
        address : '',
        facebook_id : '',
        google_id : '',        
      });

    // Function to handle opening the modal and setting the data of the product being edited
    const handleEditClick = (profile: Profile ) => {
        setFormData({
            name : profile.name,
            email : profile.email,
            phone : profile.phone,
            firstname : profile.firstname,
            lastname : profile.lastname,
            profile_img : profile.profile_img,
            type : profile.type,
            national_id_no : profile.national_id_no,
            address : profile.address,
            facebook_id : profile.facebook_id,
            google_id : profile.google_id
        });
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setFormData({
            name : '',
            email : '',
            phone : '',
            firstname : '',
            lastname : '',
            profile_img : '',
            type : '',
            national_id_no : '',
            address : '',
            facebook_id : '',
            google_id : ''                       
        });
    };
    // Function to handle form submission   
    useEffect(() => {
        console.log('userInfo', userInfo);
    }) 

    // const handleLogout = async () => {
    //     // CALLING API WITH AXIOS 
    //     try {
    //       const response = await axios.post(config.API_URL_LIVE + config.LOGOUT_URL, null, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         }
    //       });;      
    //       //setLogin(response.data); // Assuming the API response contains the response;
    
    //       if(response.status === 200){
    //         // setIsLoggedIn(false);
    //         localStorage.removeItem('isLoggedIn');
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('userInfo');
    //       }
          
    //       window.location.replace('/login');
    
    //       // Redirect or do something else after successful login
    //     } catch (error) {
    //       console.error('Error logging in:', error);
    //     }    
    //   };
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
                                <span className='fw-bold h5'><i className="fa fa-user" aria-hidden="true"></i> প্রোফাইল</span>
                            </p>
                        </div>
                        <div className="profile-detail mt-3 p-4 text-center pb-5">
                                <div className="profile-info align-items-center">
                                    <img src="/images/user.png" alt="n/a" className="img-fluid"/>
                                    <div className="info my-3 col-md-4 col-lg-4 col-sm-12 mx-auto pt-1 pb-2">
                                        <p className='m-0'>{userInfo?.email }</p>
                                        <p className='pb-0 mb-0'>{userInfo?.phone}</p>
                                    </div>
                                </div>
                                <div className="all-info border border-success col-md-4 col-lg-4 col-sm-12 mx-auto" style={{borderRadius: '5px'}}>
                                    <div className="ms-3 py-3">
                                        <p>
                                            নাম : {userInfo?.firstname} {userInfo?.lastname} <br/>
                                            ই-মেইল : {userInfo?.email? userInfo?.email : 'N/A'} <br/>
                                            মোবাইল নম্বর: {userInfo?.phone ? userInfo?.phone : 'N/A'} <br/>
                                            Nid নম্বর : {userInfo?.national_id_no ? userInfo?.national_id_no : 'N/A'} <br/>
                                            ঠিকানা : {userInfo?.address ? userInfo?.address : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-sm-12 mx-auto mt-3 d-none">
                                    <button type="button" className="border py-3 btn btn-edit btn-block w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditClick(userInfo)} >
                                        সংশোধন 
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* modal area */}
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <form>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">প্রোফাইল সংশোধন </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">                    
                        <div className="mb-2">
                            <div className="text-center my-2"><img src="/images/user.png" alt="n/a" className="img-fluid"/></div>
                            <input type="file" className="form-control input-design w-100" id="name" name="name" value={formData.profile_img}/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">প্রথম নাম :</label>
                            <input type="text" className="form-control input-design w-100" id="name" name="name" value={formData.firstname} required/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">শেষ নাম:</label>
                            <input type="text" className="form-control input-design w-100" id="name" name="name" value={formData.lastname} required/>
                        </div>                
                        {/* <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">ইমেইল:</label>
                            <input type="email" className="form-control input-design w-100" id="email" name="email" value={formData.email} readOnly/>
                        </div>                 */}
                        <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">ফোন :</label>
                            <input type="phone" className="form-control input-design w-100" id="phone" name="phone" value={formData.phone}/>
                        </div>                
                        <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label"> NID নাম্বার:</label>
                            <input type="phone" className="form-control input-design w-100" id="phone" name="phone" value={formData.national_id_no}/>
                        </div>                
                        <div className="mb-2">
                            <label htmlFor="recipient-name" className="col-form-label">ঠিকানা :</label>
                            {/* <input type="address" className="form-control input-design w-100" id="address" name="address" /> */}
                            <textarea name="address" id="address" className="form-control input-design w-100" placeholder='ঠিকানা' value={formData.address}></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-delete btn-sm" data-bs-dismiss="modal" onClick={handleCloseModal}>বাদ দিন </button>
                        <button type="submit" className="btn btn-edit btn-sm">সেভ করুন </button>
                    </div>
              </form>
            </div>
          </div>
        </div>

    </div>
    </div>
  )
}
