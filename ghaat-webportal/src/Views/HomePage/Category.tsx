import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';

export default function Category() {
    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get( config.API_URL_LIVE + config.CATEGORY_URL);
                setCategories(response.data.data.data); // Assuming the API response contains an array of category objects
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
  return (
    <div>
        <div className='category-area'>
            <div className="container mini-card-secion">
                {/* <div className="mini-card-header row">
                    <div className="sub-contanet text-center">
                        <button className="btn px-4 btn-theme btn-pay">Pay Your Grameen Bill &nbsp;&nbsp; <i className="fa-brands fa-amazon-pay fw-bold"></i></button>
                        <p>Pay your g-banker, g-cloud storage, ISP Internet Bill - via Grameen e-Haat.  </p>
                    </div>
                </div>             */}
                <div className="mini-card-grid text-center">
                    {/* <div className="card1 col-12 row">
                            {categories.map(category => (
                                <div className="mini-card col-2" key={category.id}>
                                    <Link to={`/product/${category.id}`} className='d-flex align-items-center w-100 justify-content-start'>
                                        <img src={ config.FILE_URL + category.thumb} alt={category.name} className='img-fluid'/>
                                        <p>{category.name}</p>
                                    </Link>
                                </div>
                            ))} 
                    
                        <div className="col-lg-6 grid-item-icon my-2 p-0">
                            <div className=" p-0 m-1 col-12">
                                <img src="images/10.png " className="c /ol-6 rounded " alt="n/a"/>
                                <img src="images/c10.png " className="rounded img-fluid" alt="n/a" />
                            </div>
                        </div>
                        <img src="images/c10.png " className="rounded img-fluid w-100 p-0 my-5" alt="n/a" />
                    </div>                     */}
                    <div className='d-flex flex-wrap justify-content-sm-between justify-content-center mb-3'>
                            {categories.map(category => (
                                <div className="category-card" key={category.id}>
                                    <Link to={`/product/${category.id}`} className='d-flex align-items-center w-100 justify-content-start'>
                                        <div className='card-box d-sm-flex d-block align-items-center'>                                       
                                            <img src={ config.FILE_URL + category.thumb} alt={category.name} className='img-fluid'/>
                                            <p>{category.name}</p>                                       
                                        </div>
                                     </Link>
                                </div>
                            ))} 
                            
                            <img src="images/c10.webp" className="rounded img-fluid w-100 p-0 call-to-action" alt="n/a" />

                    </div>
                    
                    {/* <div className='row'>                        
                        {categories.map(category => (
                        <div className='col-xxl-2 col-md-3 col-sm-4 col-6'>
                                <div className="mini-card col-2" key={category.id}>
                                    <Link to={`/product/${category.id}`} className='d-flex align-items-center w-100 justify-content-start'>
                                        <img src={ config.FILE_URL + category.thumb} alt={category.name} className='img-fluid ps-2'/>
                                        <p>{category.name}</p>
                                    </Link>
                                </div>
                            </div>
                        ))} 
                    </div> */}
                </div>
            </div>          
        </div>             
    </div>             
)
}
