
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import config from '../../config';
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
    status: string;
    category_id: number;
    user_id: number | null;
    created_at: string | null;
    updated_at: string;
    user: any | null; // You can define a type for the user object if needed
    // category: Category; // Nested category object
  };
export default function Dashboard() {
    const userInfoString = localStorage.getItem('userInfo');
    const formatter = new Intl.NumberFormat('bn-BD');
    const [loading, setLoading] = useState(false);
    // Parse the userInfoString to convert it back to an object
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const [formData, setFormData] = useState({
        category: '',
        id: 0,
        name: '',
        slug: '',
        description: '',
        short_description: '',
        price: '',
        unit: '',
        status: '',
        category_id: '',
        user_id: userInfo.id ,
        thumbImage: null,
        images: [],
      });
    const [deleteformData, setDeleteFormData] = useState({
        category: '',
        id: 0,
        name: '',
        slug: '',
        description: '',
        short_description: '',
        price: '',
        unit: '',
        status: '',
        category_id: '',
        user_id: userInfo.id ,
        thumbImage: null,
        images: [],
      });

      // Function to handle input changes in the modal form fields
      // Function to handle input changes in the modal form fields
        const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = event.target as HTMLInputElement;
            setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'thumbImage' ? files : value,
            }));
        };
  
      const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
          // Function to handle form submission
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // Perform your update logic here, such as making an API call
            console.log('Form data:', formData);
            // Clear form fields after submission
            setFormData({
                category: '',
                id: 0,
                name: '',
                slug: '',
                description: '',
                short_description: '',
                price: '',
                unit: '',
                status: '',
                category_id: '',
                user_id: userInfo.id ,
                thumbImage: null,
                images: [],
            });
        };
    const [editProductData, setEditProductData] = useState<Product | null>(null); // State to store data of the product being edited
    const [products, setProducts] = useState<Product[] >([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [paginationLinks, setPaginationLinks] = useState<JSX.Element[]>([]);
    const [lastPage, setLastPage] = useState<number>(1);
    const [deleteData, setDeleteData] = useState<Product | null>(null);
    useEffect(() => {        
        const fetchProductData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}?page=${currentPage}`, {
                    headers: {
                        UserId: userInfo.id,
                    }
                });
                setProducts(response.data.data.data); // Assuming the API response contains an array of category objects
                setLastPage(response.data.data.last_page); // Set the last page number    
                setLoading(false);           
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
       
        fetchProductData();
    },[]);
    // Function to handle opening the modal and setting the data of the product being edited
    const handleEditClick = (product: Product ) => {
        setFormData({
            category: product.category,
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            short_description: product.short_description,
            price: product.price.toString(),
            unit: product.unit,
            status: product.status,
            category_id: product.category_id.toString(),
            user_id: product.user_id,
            thumbImage: null,
            images: [],
        });
    };
    const handleDeleteClick = (product: Product ) => {
        setDeleteFormData({
            category: product.category,
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            short_description: product.short_description,
            price: product.price.toString(),
            unit: product.unit,
            status: product.status,
            category_id: product.category_id.toString(),
            user_id: product.user_id,
            thumbImage: null,
            images: [],
        });
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setFormData({
            category: '',
            id: 0,
            name: '',
            slug: '',
            description: '',
            short_description: '',
            price: '',
            unit: '',
            status: '',
            category_id: '',
            user_id: userInfo.id ,
            thumbImage: null,
            images: [],            
        });
    };
    
    const handleDeleteCloseModal = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`${config.API_URL_LIVE}${config.PRODUCT_URL}/${deleteData?.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });            
            setLoading(false);           
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    // Function to handle form submission  
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
    // Calculate the difference in days

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
                                                      <Link to='/dashboard' className='link-text'>ড্যাশবোর্ড</Link>
                                                  </li>
                                                  <li> <hr className="dropdown-divider" /></li>
                                                  <li>
                                                      <Link to='/ads' className='link-text'>পোস্ট সমূহ</Link>
                                                  </li>
                                                  {/* <li>
                                                      <Link to='/message' className='link-text'>মেসেজ</Link>
                                                  </li>                                                 */}
                                                  <li>
                                                      <Link to='/transaction' className='link-text'>ট্রানজেকশন</Link>
                                                  </li>                                                
                                                  <li> <hr className="dropdown-divider" /></li>
                                                  <li>
                                                      <Link to='/profile' className='link-text'>প্রোফাইল </Link>
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
                        <div className='sidebar-call-to-action mt-3'>
                            <img src="/images/call-to-acctio3.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="/images/call-to-acctio4.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="/images/call-to-acctio5.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="/images/call-to-acctio6.webp" alt="n/a" className='img-fluid mb-3'/>
                        </div>
                        </div>
                    </div>
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
                                    <div className="col-auto ">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>সর্ট করুন</option>
                                            <option value="1">{formatter.format(10)} প্রতি পেজ</option>
                                            <option value="2">{formatter.format(20)} প্রতি পেজ</option>
                                            <option value="3">{formatter.format(50)} প্রতি পেজ</option>
                                            <option value="3">{formatter.format(100)} প্রতি পেজ</option>
                                        </select>
                                    </div>
                                    <div className="col-auto">
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>দিন</option>
                                            <option value="1">আজ</option>
                                            <option value="2">মাস</option>
                                            <option value="3">বছর</option>
                                        </select>
                                    </div>
                                </form>                                
                            </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
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
                                    <div className='col-lg-3 col-md-4 col-sm-6 my-3' key={product.id} >
                                    <div className="card  h-100">
                                       <Link to={`/product_details/${product.id}`}>
                                                {/* <img className="card-img-top h-90 rounded" src={config.FILE_URL + product.thumb} alt="Product thumbnail" /> */}
                                                 {/* Use conditional rendering or fallback value for product.thumb */}
                                                 {product.thumb ? (
                                                    <img className="card-img-top h-90 rounded" src={config.FILE_URL + product.thumb} alt="Product thumbnail" />
                                                 ) : (
                                                    <img className="card-img-top h-90 rounded" src="placeholder.jpg" alt="Product thumbnail" />
                                        )}
                                        </Link>
                                        <div className="card-body p-1">
                                            <Link to={`/product_details/${product.id}`}><p className=" m-0 text-align-right card-content mt-2">{product.name}</p></Link>
                                            <div className="d-flex justify-content-between p-0 m-0 title">
                                                <address className="my-2"> <i className="bi bi-geo-alt"></i> Dhaka, Bangladesh </address>                                                 
                                            </div>                                                
                                            <div className="p-0 m-0 d-flex justify-content-between my-2">                                                
                                                <p className="info-price m-0 text-end fw-bold text-nowrap">৳: {formatter.format(product.price)}</p>
                                                <p className="info-content m-0 text-end">{displayTimes[index]}</p>
                                            </div>
                                            <div className="ms-2 mb-2 d-flex justify-content-between">
                                                <Link to={`../ads-form/${product.id}`}><button type="button" className="btn w-100 btn-edit btn-sm me-2 text-white"><i className="fa fa-edit"></i></button></Link>
                                                {/* <button type="button" className="btn w-50 btn-warning btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => handleEditClick(product)} >
                                                    <i className="fa fa-edit"></i>
                                                </button> */}
                                                {/* <button type="button" className="btn w-50 btn-delete btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => handleDeleteClick(product)}>
                                                    <i className="fa fa-trash"></i>
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                ))}                     

                                    {/* loop of productArray*/}
                                    {!loading && products.length === 0 ? (
                                        <p className='text-center text-danger mt-5'> কোন পণ্য নেই দয়া করে পণ্য যোগ করুন </p>
                                    ) : null}
                                    {/* items end */}     
                                    
                                </div>

                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                                <div>
                                    {products && products.map((product, index) => (
                                        <div className="list-card" key={product.id}>
                                            <div className="row">
                                                <div className="product-image col-md-3 col-lg-4 col-sm-4">
                                                    <Link to={`/product/${product.id}`}>
                                                        <img src={product.thumb ? `${config.FILE_URL}${product.thumb}` : './images/list_product1.png'} alt="Product thumbnail" className="img-fluid" />
                                                    </Link>
                                                </div>
                                                <div className="list-card-content col-md-9 col-lg-8 col-sm-8">
                                                    <Link to={`/product/${product.id}`} className="content-title">
                                                        <p>{product.name}</p>
                                                    </Link>
                                                    <p className="location d-flex justify-content-space-between">
                                                        {product.category.name}, {product.category.description} <span>{displayTimes[index]}</span>
                                                    </p>
                                                    {/* <div className="d-flex tags">
                                                        <span><Link to="/product_details">2019</Link></span>
                                                        <span><Link to="/product_details">New</Link></span>
                                                        <span><Link to="/product_details">Free Delivery</Link></span>
                                                    </div> */}
                                                    <div className="poduct-description mt-2">
                                                        <p>  <span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                                                    </div>
                                                    <div className="text-end price">
                                                        Tk: {product.price}
                                                    </div>
                                                    <div>
                                                    <Link to={`../ads-form/${product.id}`}><button type="button" className="btn btn-edit me-2 text-white"><i className="fa fa-edit"></i></button></Link>
                                                    {/* <button type="button" className="btn btn-edit btn-sm me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"  onClick={() => handleEditClick(product)} >
                                                        Edit
                                                    </button> */}
                                                    {/* <button type="button" className="btn btn-delete btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => handleDeleteClick(product)}>
                                                        Delete
                                                    </button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {/* loop of productArray*/}
                                    {!loading && products.length === 0 ? (
                                        <p className='text-center text-danger mt-5'> কোন পণ্য নেই দয়া করে পণ্য যোগ করুন </p>
                                    ) : null}
                                </div>                                  
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='col-md-3 d-bock d-sm-none'>
                    <div className='sidebar'>
                        <div className='sidebar-card-area'>
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button d-flex justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                   <span>Condition</span>  <i className="bi bi-plus-lg"></i> <i className="bi bi-dash-lg"></i>
                                </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <form action="">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    All
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                                    Good
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked2"  />
                                                <label className="form-check-label" htmlFor="flexCheckChecked2">
                                                    Excellent
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked3"  />
                                                <label className="form-check-label" htmlFor="flexCheckChecked3">
                                                    Average
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked4"  />
                                                <label className="form-check-label" htmlFor="flexCheckChecked4">
                                                    Recondition
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                   <span> Car Brand</span> <i className="bi bi-plus-lg"></i> <i className="bi bi-dash-lg"></i>
                                </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <form action="">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Toyota
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Hyundai
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                TATA
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Nissan
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Audi
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Suzuki
                                            </label>
                                        </div>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='sidebar-call-to-action mt-3'>
                            <img src="./images/call-to-acctio3.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="./images/call-to-acctio4.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="./images/call-to-acctio5.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="./images/call-to-acctio6.webp" alt="n/a" className='img-fluid mb-3'/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* modal area */}
        {/* <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <form>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">এডিট প্রোডাক্ট</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">                    
                        <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">প্রোডাক্ট নাম:</label>
                        <input type="text" className="form-control input-design w-100" id="name" name="name" value={formData.name} onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">সিলেক্ট ক্যাটাগরি:</label>
                        <select className="form-select input-design form-control" aria-label="Default select example"  id="categoryId" name="categoryId" value={formData.category_id} onChange={handleSelectChange}>
                            <option selected disabled>সিলেক্ট ক্যাটাগরি</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        </div>                        
                        <div className="mb-3">
                            <label htmlFor="shortDescription" className="col-form-label">ছোট ডেসক্রিপশন:</label>
                            <textarea className="form-control input-design w-100"  rows={5} id="shortDescription" name="shortDescription" value={formData.short_description} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="description" className="col-form-label">ডেসক্রিপশন:</label>
                        <textarea className="form-control input-design w-100" rows={5} id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">থাম্ব ইমেজ:</label>
                            <input type="file" className="form-control input-design w-100" id="thumbImage" name="thumbImage" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">ইমেজ :</label>
                        <input type="file" className="form-control input-design w-100" id="images" name="images" multiple/>
                        </div>   
                        <div className="mb-3">
                        <label htmlFor="recipient-name" className="col-form-label">দাম :</label>
                        <input type="text" className="form-control input-design w-100" id="price" name="price" value={formData.price} onChange={handleChange}/>
                        </div>                 
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-delete btn-sm" data-bs-dismiss="modal" onClick={handleCloseModal}>বাদ দিন </button>
                        <button type="submit" className="btn btn-edit btn-sm">সেভ করুন </button>
                    </div>
              </form>
            </div>
          </div>
        </div> */}
        {/* delete modal */}
        {/* <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Delete Modal</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <p className='text-center text-danger'>Are you sure you want to delete {deleteformData.name} product?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteCloseModal}>Delete</button>
              </div>
            </div>
          </div>
        </div> */}
    </div>
    </div>
  )
}
