import React, { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import Sidebar from '../UserPage/Siderbar';

export default function Dashboard() {
    // const userInfoString = localStorage.getItem('userInfo');

    // Parse the userInfoString to convert it back to an object
    // const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    useEffect(() => {      
        // userInfo;
    },[]);
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
                                <span className='fw-bold h5'> <i className="fa fa-dashboard"></i>  ট্রানজেকশন</span>
                            </p>
                        </div>
                        <div className='tab-content py-5' id="myTabContent">
                            {/* <h1>{{userInfo?.name}}</h1> */}
                        </div>                        
                    </div>
                </div>                
            </div>
        </div>
    </div>
    </div>
  )
}
