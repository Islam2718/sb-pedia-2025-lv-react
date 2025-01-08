
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import config from '../../config';
import Sidebar from '../UserPage/Siderbar';

interface Product {
    category: any;
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    thumb: string | null;
    images: string[] | null;
    price: number;
    unit: string;
    status: 0 | 1 | 2 | 3 | 4 | 5;
    category_id: number;
    user_id: number | null;
    created_at: string | null;
    updated_at: string;
    user: any | null; // You can define a type for the user object if needed
    // category: Category; // Nested category object
  };
export default function Ads() {
    const userInfoString = localStorage.getItem('userInfo');
    const formatter = new Intl.NumberFormat('bn-BD');
    const [loading, setLoading] = useState(false);
    // Parse the userInfoString to convert it back to an object
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage] = useState<number>(1);
    // const [paginationLinks, setPaginationLinks] = useState<JSX.Element[]>([]);
    // const [setLastPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12); // State for page size
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null); // State for selected product ID 
    const [selectedProductName, setSelectedProductName] = useState<string | null>(null); // State for selected product ID 
    const [selectedStatus, setSelectedStatus] = useState<number>(1); // State for selected status

    const fetchProductData = async (page: number, size: number) => {
        try {
            setLoading(true);
            const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}`, {
                headers: {
                    UserId: userInfo.id,
                    page: page,
                    size: size,
                }
            });
            setProducts(response.data.data.data); // Assuming the API response contains an array of category objects
            //setLastPage(response.data.data.last_page); // Set the last page number
            setLoading(false);           
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProductData(currentPage, pageSize);
    }, [currentPage, pageSize]); // Update useEffect dependencies
    
    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(event.target.value));
    };


    const handleModalOpen = (productId: number, status: number, productName: string) => {
        setSelectedProductId(productId);
        setSelectedStatus(status);
        setSelectedProductName(productName);
    };

    const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedStatus(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (selectedProductId !== null) {
            try {
                await axios.put(`${config.API_URL_LIVE}${config.PRODUCT_URL}/${selectedProductId}`, {
                    status: selectedStatus,
                    name: selectedProductName
                }, {
                    headers: {
                        UserId: userInfo.id,
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                fetchProductData(currentPage, pageSize); // Re-fetch products after status update
                setSelectedProductId(null); // Reset selected product ID
                setSelectedStatus(1); // Reset selected status

            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };
    
  // Extract text content from HTML
    const displayTimes = products.map((product) => {
        // Extract the single timestamp from the product object
        const timestamp = product.created_at || product.updated_at;
    
        // Calculate the difference in days for the single timestamp
        const then = new Date(timestamp);
        const now = new Date();
        const diffInMs = now.getTime() - then.getTime();
        const secondsAgo = Math.round(diffInMs / 1000);
        const minutesAgo = Math.round(secondsAgo / 60);
        const hoursAgo = Math.round(minutesAgo / 60);
        const daysAgo = Math.round(hoursAgo / 24);
        const monthsAgo = Math.round(daysAgo / 30); // Approximate calculation for months
        const yearsAgo = Math.round(monthsAgo / 12);
    
        // Determine display text for the single timestamp
        let displaytime;
        if (secondsAgo < 60) {
            displaytime = secondsAgo === 0 ? "এখন মাত্র" : `${secondsAgo} সেকেন্ড আগে`;
        } else if (minutesAgo < 60) {
            displaytime = `${minutesAgo} মিনিট${minutesAgo > 1 ? '' : ''} আগে`;
        } else if (hoursAgo < 24) {
            displaytime = `${hoursAgo} ঘণ্টা${hoursAgo > 1 ? '' : ''} আগে`;
        } else if (daysAgo < 30) {
            displaytime = `${daysAgo} দিন${daysAgo > 1 ? '' : ''} আগে`;
        } else if (monthsAgo < 12) {
            displaytime = `${monthsAgo} মাস${monthsAgo > 1 ? '' : ''} আগে`;
        } else {
            displaytime = `${yearsAgo} বছর${yearsAgo > 1 ? '' : ''} আগে`;
        }
    
        return displaytime; // Return the display time for the single timestamp
    });
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
                                 <span className='fw-bold h5'><i className="fa fa-user" aria-hidden="true"></i> আমার বিজ্ঞাপন</span>
                            </p>
                            <div className='search-filter d-flex align-items-center'>
                                <ul className="nav nav-tabs " id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><img src="/images/grid.png" alt="n/a" className='img-fluid' /></button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><img src="/images/list.png" alt="n/a" className='img-fluid' /></button>
                                    </li>
                                </ul>
                                <form className="row g-3">                                    
                                <div className="col-auto">
                                    <select 
                                        className="form-select text-center" 
                                        aria-label="Default select example"
                                        value={pageSize} // Set the selected value
                                        onChange={handlePageSizeChange} // Handle change event
                                    >
                                        <option value="" disabled>সর্ট করুন</option>
                                        <option value="12">{formatter.format(12)} / পেজ</option>
                                        <option value="24">{formatter.format(24)} / পেজ</option>
                                        <option value="50">{formatter.format(50)} / পেজ</option>
                                        <option value="100">{formatter.format(100)} / পেজ</option>
                                    </select>
                                </div>

                                    {/* <div className="col-auto">
                                        <select className="form-select text-center" aria-label="Default select example">
                                            <option selected>দিন</option>
                                            <option value="1">আজ</option>
                                            <option value="2">মাস</option>
                                            <option value="3">বছর</option>
                                        </select>
                                    </div> */}
                                </form>                                
                            </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            {/* grid view  */}
                            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                                <div className='row'>                                    
                                    {loading && loading? (
                                        <div className='text-center'>
                                            <div className="spinner-grow text-yellow" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                    }
                                                                                                  
                                    {products && products.map((product, index) => (
                                        <div className='col-lg-4 col-md-4 col-sm-6 my-3' key={product.id} >
                                        <div className="card  h-100">
                                            <Link to={`/product_details/${product.id}`}>
                                                {product.thumb ? (
                                                    <img className="card-img-top h-90 rounded" src={config.FILE_URL + product.thumb} alt="Product thumbnail" />
                                                ) : (
                                                    <img className="card-img-top h-90 rounded" src="placeholder.jpg" alt="Product thumbnail" />
                                                )}
                                            </Link>
                                            <div className="card-body p-1">
                                                <Link to={`/product_details/${product.id}`}><p className=" m-0 text-align-right card-content mt-2">{product.name}</p></Link>
                                                {/* <div className="d-flex justify-content-between p-0 m-0 title">
                                                    <address className="my-2"> <i className="bi bi-geo-alt"></i> Dhaka, Bangladesh </address>                                                 
                                                </div>                                                 */}
                                                <div className="p-0 m-0 d-flex1 justify-content-between my-2">                                                
                                                    <p className="info-price m-0 text-start fw-bold text-nowrap">৳: {formatter.format(product.price)}</p>
                                                    <p className="info-content m-0 text-start">{displayTimes[index]}</p>
                                                </div>
                                                <div className="ms-2 mb-2 d-flex justify-content-between">
                                                    {product.status === 0 && <span>
                                                        <button className="btn btn-sm me-4 btn-edit w-100 text-white" disabled>
                                                            <i className="fa-solid fa-hourglass-start"></i> Pending
                                                        </button>
                                                    </span>}
                                                    {product.status === 1 && <span>
                                                        <button className="btn btn-sm me-4 btn-edit w-100 text-white" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => handleModalOpen(product.id, product.status, product.name)}>
                                                            <i className="fa-solid fa-check"></i> Approved
                                                        </button>
                                                    </span>}
                                                    {product.status === 2 && <span>
                                                        <button className="btn btn-sm me-4 btn-edit w-100 text-white" disabled>
                                                            <i className="fa-solid fa-check"></i> Rejected
                                                        </button>
                                                    </span>}
                                                    {product.status === 3 && <span>
                                                        <button className="btn btn-sm me-4 btn-edit w-100 text-white" >
                                                            <i className="fa-solid fa-check"></i> Hold
                                                        </button>
                                                    </span>}
                                                    {product.status === 4 && <span>
                                                        <button className="btn btn-sm me-4 btn-edit w-100 text-white btn-disabled" disabled>
                                                            <i className="fa-solid fa-check"></i> Locked
                                                        </button>
                                                    </span>}
                                                    {product.status === 5 && <span>
                                                        <button className="btn btn-sm me-4 btn-edit w-100 text-white">
                                                            <i className="fa-solid fa-check"></i> Deleted
                                                        </button>
                                                    </span>}
                                                    <Link to={`../ads-form/${product.id}`} className="btn w-50 btn-edit btn-sm me-2 text-white"><i className="fa fa-edit"></i> Edit</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                    ))}                     

                                    {/* loop of productArray*/}
                                    {!loading && products.length === 0 ? (
                                            <div className='border bg-white rounded py-5'>
                                                <div className='card-body text-center'>
                                                    <h5 className='card-title mb-4'>কোন বিজ্ঞাপন পাওয়া যায়নি</h5>
                                                    <Link to="../ads-form" className="btn btn-theme text-white">+ বিজ্ঞাপন যুক্ত করুন </Link>
                                                </div>
                                            </div>
                                    ) : null}
                                    {/* items end */}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                                {/* list view  */}
                                {loading && loading? (
                                        <div className='text-center'>
                                            <div className="spinner-grow text-yellow" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        )
                                        :
                                        (
                                            <></>
                                        )
                                    }
                                <div>
                                    {products && products.map((product, index) => (
                                        <div className="list-card" key={product.id}>
                                            <div className="row">
                                                <div className="product-image col-md-3 col-lg-4 col-sm-4">
                                                    <Link to={`/product/${product.id}`}>
                                                        {product.thumb ? (
                                                            <img className="img-fluid" src={config.FILE_URL + product.thumb} alt="Product thumbnail" />
                                                        ) : (
                                                            <img className="img-fluid" src="placeholder.jpg" alt="Product thumbnail" />
                                                        )}
                                                    </Link>
                                                </div>
                                                <div className="list-card-content col-md-9 col-lg-8 col-sm-8 p-3">
                                                    <Link to={`/product/${product.id}`} className="content-title fw-bold">{product.name}</Link>
                                                    <div className="price py-2 px-0 fw-bold my-2"> Tk: {product.price}</div>
                                                    <p className="location">
                                                        ক্যাটেগরীঃ {product.category.name} | ঠিকানাঃ {product.user.address? product.user.address:"n/a"} | {displayTimes[index]}
                                                    </p>
                                                    <div className="poduct-description mt-2">
                                                        <p><span dangerouslySetInnerHTML={{ __html: product.short_description? product.short_description:"--" }} /></p>                                                        
                                                    </div>
                                                    <div className="ms-2 mb-2">
                                                        {product.status === 0 && <span>
                                                            <button className="btn btn-sm mx-0 btn-edit w-25 text-white" disabled>
                                                                <i className="fa-solid fa-hourglass-start"></i> Pending
                                                            </button>
                                                        </span>}
                                                        {product.status === 1 && <span>
                                                            <button className="btn btn-sm mx-0 btn-edit w-25 text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                                <i className="fa-solid fa-check"></i> Approved
                                                            </button>
                                                            </span>}
                                                        {product.status === 2 && <span>
                                                            <button className="btn btn-sm mx-0 btn-edit w-25 text-white" disabled>
                                                                <i className="fa-solid fa-check"></i> Rejected
                                                            </button>
                                                        </span>}
                                                        {product.status === 3 && <span>
                                                            <button className="btn btn-sm mx-0 btn-edit w-25 text-white" >
                                                                <i className="fa-solid fa-check"></i> Hold
                                                            </button>
                                                        </span>}
                                                        {product.status === 4 && <span>
                                                            <button className="btn btn-sm mx-0 btn-edit w-25 text-white btn-disabled" disabled>
                                                                <i className="fa-solid fa-check"></i> Locked
                                                            </button>
                                                        </span>}
                                                        {product.status === 5 && <span>
                                                            <button className="btn btn-sm mx-0 btn-edit w-25 text-white">
                                                                <i className="fa-solid fa-check"></i> Deleted
                                                            </button>
                                                        </span>}
                                                        <Link to={`../ads-form/${product.id}`} className="btn w-25 btn-edit btn-sm mx-3 text-white"><i className="fa fa-edit"></i> Edit</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* loop of productArray*/}
                                    {!loading && products.length === 0 ? (
                                        <div className='border bg-white rounded py-5'>
                                            <div className='card-body text-center'>
                                                <h5 className='card-title mb-4'>কোন বিজ্ঞাপন পাওয়া যায়নি</h5>
                                                <Link to="../ads-form" className="btn btn-theme text-white">+ বিজ্ঞাপন যুক্ত করুন </Link>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>                                  
                            </div>
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
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">স্ট্যাটাস পরিবর্তন করুন </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-2">
                                <div className="form-check px-5 border rounded my-3 py-2">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="status" 
                                        id="flexRadioDefault1" 
                                        value="1" 
                                        checked={selectedStatus === 1} 
                                        onChange={handleStatusChange} 
                                        disabled 
                                    />
                                    <label className="form-check-label btn-block" htmlFor="flexRadioDefault1">
                                        Pending
                                    </label>
                                </div>
                                <div className="form-check px-5 border rounded my-3 py-2">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="status" 
                                        id="flexRadioDefault3" 
                                        value="3"
                                        checked={selectedStatus === 3} 
                                        onChange={handleStatusChange}
                                    />
                                    <label className="form-check-label btn-block" htmlFor="flexRadioDefault3">
                                        Hold
                                    </label>
                                </div>
                                <div className="form-check px-5 border rounded my-3 py-2">
                                    <input 
                                        className="form-check-input" 
                                        type="radio" 
                                        name="status" 
                                        id="flexRadioDefault5" 
                                        value="5" 
                                        checked={selectedStatus === 5} 
                                        onChange={handleStatusChange}
                                    />
                                    <label className="form-check-label btn-block" htmlFor="flexRadioDefault5">
                                        Delete
                                    </label>
                                </div>
                            </div> 
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-delete btn-sm" data-bs-dismiss="modal">বাদ দিন </button>
                            <button type="submit" className="btn btn-edit btn-sm" data-bs-dismiss="modal" disabled={selectedStatus === 1} >সেভ করুন </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
