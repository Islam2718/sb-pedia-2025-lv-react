import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import Sidebar from '../UserPage/Siderbar';

export default function Dashboard() {
    const formatter = new Intl.NumberFormat('bn-BD');
    const [totalProduct, setTotalProduct] = useState<number>(0);
    const userInfoString = localStorage.getItem('userInfo');

    useEffect(() => {
        const fetchProductData = async () => {
            const loggedInUserId = userInfoString ? JSON.parse(userInfoString).id : null;
            try {
                const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}`, {
                    headers: { "userId": loggedInUserId }
                });
                setTotalProduct(response.data.data.total);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProductData();
    }, [userInfoString]);

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
                                        <span className='fw-bold h5'><i className="fa fa-dashboard"></i> ড্যাশবোর্ড </span>
                                    </p>
                                    <div className='search-filter d-flex align-items-center'>
                                        <form className="row g-3">
                                            <div className="col-auto me-1">
                                                <i className="fa-solid fa-bell"></i> {formatter.format(0)}
                                            </div>
                                            <div className="col-auto me-1">
                                                <i className='fa fa-envelope'></i> {formatter.format(0)}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='card1'>
                                    <div className='card-body text-center my-5'>
                                        <h1 className='fw-bold dashboard-title'>গ্রামীন ই-হাট</h1>
                                        <small>এ আপনাকে</small>
                                        <h2 className='fw-bold dashboard-title2'>স্বাগতম !</h2>
                                    </div>
                                    {/* //total product  */}
                                    <div className='card-footer1 text-center col-10 mx-auto'>
                                        <div className='row'>
                                            <div className='col-md-4 mx-auto'>
                                                <div className='total-product'>
                                                    <h5 className='fw-bold'>
                                                        <i className="fa-brands fa-product-hunt"></i> &nbsp;
                                                        প্রোডাক্ট  : {formatter.format(totalProduct)}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className='col-md-4 mx-auto'>
                                                <div className='total-product'>
                                                    <h5 className='fw-bold'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-inboxes" viewBox="0 0 16 16">
                                                            <path d="M4.98 1a.5.5 0 0 0-.39.188L1.54 5H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0A.5.5 0 0 1 10 5h4.46l-3.05-3.812A.5.5 0 0 0 11.02 1zm9.954 5H10.45a2.5 2.5 0 0 1-4.9 0H1.066l.32 2.562A.5.5 0 0 0 1.884 9h12.234a.5.5 0 0 0 .496-.438zM3.809.563A1.5 1.5 0 0 1 4.981 0h6.038a1.5 1.5 0 0 1 1.172.563l3.7 4.625a.5.5 0 0 1 .105.374l-.39 3.124A1.5 1.5 0 0 1 14.117 10H1.883A1.5 1.5 0 0 1 .394 8.686l-.39-3.124a.5.5 0 0 1 .106-.374zM.125 11.17A.5.5 0 0 1 .5 11H6a.5.5 0 0 1 .5.5 1.5 1.5 0 0 0 3 0 .5.5 0 0 1 .5-.5h5.5a.5.5 0 0 1 .496.562l-.39 3.124A1.5 1.5 0 0 1 14.117 16H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .121-.393zm.941.83.32 2.562a.5.5 0 0 0 .497.438h12.234a.5.5 0 0 0 .496-.438l.32-2.562H10.45a2.5 2.5 0 0 1-4.9 0z"/>
                                                        </svg>  &nbsp;
                                                        ইনবক্স : {formatter.format(0)}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className='col-md-4 mx-auto'>
                                                <div className='total-product'>
                                                    <h5 className='fw-bold'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
                                                        </svg> &nbsp;
                                                        নোটিফিকেশন : {formatter.format(0)}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
