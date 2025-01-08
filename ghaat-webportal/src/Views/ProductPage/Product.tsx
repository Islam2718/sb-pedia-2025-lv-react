import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';

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
    created_at: string;
    updated_at: String;
    user: any | null; // You can define a type for the user object if needed
    // category: Category; // Nested category object
  };
  interface Category {
    id: number;
    name: string;
    thumb: string;
    description: string;
    status: string;
  }
// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function Product(): JSX.Element {
  const [minValue, setMinValue] = useState<number>(130);
  const [maxValue, setMaxValue] = useState<number>(250);
  const [loading, setLoading] = useState(false);
  const formatter = useMemo(() => {
    return new Intl.NumberFormat('bn-BD');
  }, []);

  useEffect(() => {
    const sliderRange = document.getElementById('slider-range') as HTMLInputElement;

    const handleChange = () => {
      const min = parseInt(sliderRange.value.split(',')[0], 10); // Parse as base 10 integer
      const max = parseInt(sliderRange.value.split(',')[1], 10); // Parse as base 10 integer
    //   console.log(min, max);
      if (!isNaN(min)) {
        setMinValue(min);
      }

      if (!isNaN(max)) {
        setMaxValue(max);
      }
    };

    sliderRange.addEventListener('input', handleChange);

    return () => {
      sliderRange.removeEventListener('input', handleChange);
    };
  }, []);

  useEffect(() => {
    const amount = document.getElementById('amount') as HTMLInputElement;
    amount.value = `৳${minValue} - ৳${maxValue}`;
  }, [minValue, maxValue]);

  const [products, setProducts] = useState<Product[]>([]); 
  const [category, setCategory] = useState<Category[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationLinks, setPaginationLinks] = useState<JSX.Element[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12); // State for page size
  let id = useParams<{ id: string }>().id;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKey = searchParams.get('search-key');
  const [activeCategoryId, setActiveCategoryId] = useState(0); // Default to first category
    useEffect(() => {       
        window.scrollTo(0, 0) 
        const fetchProductData = async (page: number, size: number) => {
            try {
                if (id) {
                    setLoading(true);
                    const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}?category-id=${id}&status=1&page=${page}&size=${size}`,
                        { 
                            headers: { 
                                // "page": currentPage,
                                page: page,
                                size: size,
                            }
                        }
                    );
                    setProducts(response.data.data.data); // Assuming the API response contains an array of category objects
                    setLastPage(response.data.data.last_page); // Set the last page number
                    setActiveCategoryId(parseInt(id));
                    setLoading(false);
                }
                else if(searchKey){
                    setLoading(true);
                     // eslint-disable-next-line react-hooks/exhaustive-deps
                     id = '';
                    const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}?search-key=${searchKey}&page=${currentPage}`, { headers: { "status": 1 }} );
                    setProducts(response.data.data.data); // Assuming the API response contains an array of category objects
                    setLastPage(response.data.data.last_page); // Set the last page number
                    setLoading(false);
                    setActiveCategoryId(response.data.data.data[0].category_id);
                }
                else {
                    setLoading(true);
                    const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}`, 
                        { 
                            headers: {                                
                                page: page,
                                size: size,
                                "status": 1
                            } 
                        }
                    );
                    setProducts(response.data.data.data); // Assuming the API response contains an array of category objects
                    setLastPage(response.data.data.last_page); // Set the last page number
                    setLoading(false);
                    setActiveCategoryId(0);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get( config.API_URL_LIVE + config.CATEGORY_URL);
                setCategory(response.data.data.data); // Assuming the API response contains an array of category objects
                // setLastPage(response.data.data.last_page); // Set the last page number
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchProductData( currentPage, pageSize);
        fetchCategoryData();
    }, [id, searchKey, currentPage, pageSize]);

    useEffect(() => {
        // Generate pagination links whenever lastPage changes
        const paginationLinksArray = [];
        for (let i = 1; i <= lastPage; i++) {
            paginationLinksArray.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
                    <Link to={`?page=${i}`} className="page-link" onClick={() => setCurrentPage(i)}>{formatter.format(i)}</Link>
                </li>
            );
        }
        setPaginationLinks(paginationLinksArray);
    }, [lastPage, currentPage, formatter, pageSize]);

    const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(event.target.value));
    };

    const displayTimes = products.map((product) => {
        // Extract the single timestamp from the product object
        const timestamp = product.created_at;    
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
    <div className='product-page'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-3 d-none d-sm-block'>
                    <div className='sidebar'>
                        <div className='sidebar-card-area'>
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                   <span className="accordion-button">ক্যাটেগরি সমূহ</span>                       
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <div className='category'>
                                            <ul className='list-unstyled'>
                                                <li>
                                                    <Link
                                                     to='/product'
                                                     className={`link-text ${activeCategoryId === 0 ? 'category-link' : ''}`}
                                                    >সবগুলো</Link>
                                                </li>
                                                {category.map((category) => (
                                                    <li key={category.id} className={`${category.id === 1 ? 'category-list active' : 'category-list'}`}>
                                                        <Link to={`/product/${category.id}`}  className={`link-text category-text-design ${activeCategoryId === category.id ? 'category-link' : ''}`}>
                                                            {category.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*-------------- Price -------------- */}
                            <div className="accordion-item d-none">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed d-flex justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        <span> মূল্য</span> <i className="bi bi-plus-lg"></i> <i className="bi bi-dash-lg"></i>
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                <div className="input-group mb-3">
                                    <div className="price-range-slider w-100">
                                        <p className="range-value">
                                            <input type="text" id="amount" readOnly />
                                        </p>
                                        {/* <input
                                            type="range"
                                            id="slider-range"
                                            min={130}
                                            max={500}
                                            value={`${minValue}`}
                                            step={1}
                                            // onChange={handleChange()}
                                        />
                                        <input
                                            type="range"
                                            id="slider-range"
                                            min={130}
                                            max={500}
                                            value={`${maxValue}`}
                                            step={1}
                                            onChange={(e) => setMinValue(parseInt(e.target.value, 10))}
                                        /> */}
                                        <input type="range" className='form-range w-100' />
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>
                            {/*-------------- car brand -------------- */}
                            {/* <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                   <span> ব্রান্ড</span> <i className="bi bi-plus-lg"></i> <i className="bi bi-dash-lg"></i>
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
                            </div> */}
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
                            <p className='search-reasult mt-3'>অনুসন্ধান    ফলাফল: <span>
                                {category.map((item: any) => (
                                    // item.id == id ? <span key={item.id}>{item.name}</span> : null
                                    item.id === id ? <span key={item.id}>{item.name}</span> : null
                                ))}
                                 {!id && !searchKey && <span>সবগুলো</span>} {/* Render if no category ID */}
                                 {searchKey && <span>{searchKey}</span>}
                                ({products.length})
                                </span>
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
                                        <select className="form-select" aria-label="Default select example">
                                            <option selected>By Date</option>
                                            <option value="1">Today</option>
                                            <option value="2">This Month</option>
                                            <option value="3">Last Month</option>
                                        </select>
                                    </div> */}
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
                                {products.map((product, index) => (
                                        <div className='col-lg-3 col-md-4 col-sm-6 my-3 col-6 ' key={product.id} >
                                            <div className="card h-100">
                                                <Link to={`/product_details/${product.id}`}>
                                                    {product.thumb ? (
                                                        <img className="card-img-top h-90 rounded" src={config.FILE_URL + product.thumb} alt="Product thumbnail" />
                                                    ) : (
                                                        <img className="card-img-top h-90 rounded" src="images/thumb-product.png" alt="Product thumbnail" />
                                                    )}
                                                </Link>
                                                <div className="card-body p-1">
                                                    <Link to={`/product_details/${product.id}`}><p className=" m-0 text-align-right card-content">{product.name}</p></Link>
                                                    <div className="d-flex justify-content-between p-0 m-0 title">
                                                        <address> <i className="bi bi-geo-alt"></i> Dhaka </address>
                                                    </div>                                                
                                                    <div className="d-flex justify-content-between p-0 m-0 title">
                                                        <p className="info-price m-0 text-end">৳: {formatter.format(product.price)}</p> <span>{displayTimes[index]}</span>
                                                    </div>  
                                                </div>
                                            </div>
                                        </div> 
                                    ))}
                                {!loading && products.length === 0 ? (
                                        <p className='text-center text-danger mt-5'> কোন পণ্য খুঁজে পাওয়া যায়নি </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                            <div>
                                {products.map((product, index) => (
                                    <div className="list-card" key={product.id}>
                                        <div className="row">
                                            <div className="product-image col-md-3 col-lg-4 col-sm-4">
                                                <Link to={`/product_details/${product.id}`}>
                                                    <img src={product.thumb ? `${config.FILE_URL}${product.thumb}` : './images/thumb-product.png'} alt="Product thumbnail" className=" grid-img" />
                                                </Link>
                                            </div>
                                            <div className="list-card-content col-md-9 col-lg-8 col-sm-8">
                                                <Link to={`/product_details/${product.id}`} className="content-title">
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
                                                <div className="poduct-description">
                                                    <p><span dangerouslySetInnerHTML={{ __html: product.short_description }} /></p>
                                                </div>
                                                <div className="text-end price">
                                                    ৳: {formatter.format(product.price)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>                                    
                                ))}
                            </div>
                            </div>
                        </div>
                        <div className='pagination d-flex justify-content-center my-5'>
                          {/* Pagination */}
                            <nav aria-label="Page navigation example">
                                <ul className="pagination custom-pagination">
                                    {/* Previous page link */}
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <Link to="#" className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>আগে</Link>
                                    </li>
                                    
                                    {/* Pagination links */}
                                    {paginationLinks}
                                    
                                    {/* Next page link */}
                                    <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>
                                        <Link to="#" className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>পরে</Link> 
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 d-bock d-sm-none'>
                    <div className='sidebar'>
                        <div className='sidebar-card-area'>
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                   <span className="accordion-button">ক্যাটেগরি সমূহ</span>                       
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                    <div className="accordion-body">
                                        <div className='category'>
                                            <ul className='list-unstyled'>
                                                <li>
                                                    <Link to='/product' className='link-text category-link'>সবগুলো</Link>
                                                </li>
                                                {category.map((category) => (
                                                    <li key={category.id} className={`${category.id === 1 ? 'category-list active' : 'category-list'}`}>
                                                        <Link to={`/product/${category.id}`} className='link-text category-text-design '>
                                                            {category.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                    <span> মূল্য</span> <i className="bi bi-plus-lg"></i> <i className="bi bi-dash-lg"></i>
                                </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                <div className="accordion-body">
                                <div className="input-group mb-3">
                                    <div className="price-range-slider">
                                        <p className="range-value">
                                            <input type="text" id="amount" readOnly />
                                        </p>
                                        <input
                                            type="range"
                                            id="slider-range"
                                            min={130}
                                            max={500}
                                            value={`${minValue}`}
                                            step={1}
                                            // onChange={handleChange()}
                                        />
                                        <input
                                            type="range"
                                            id="slider-range"
                                            min={130}
                                            max={500}
                                            value={`${maxValue}`}
                                            step={1}
                                            onChange={(e) => setMinValue(parseInt(e.target.value, 10))}
                                        />
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>
                            {/* <div className="accordion-item">
                                <h2 className="accordion-header">
                                <button className="accordion-button collapsed d-flex justify-content-between" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                   <span> ব্রান্ড</span> <i className="bi bi-plus-lg"></i> <i className="bi bi-dash-lg"></i>
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
                            </div> */}
                        </div>
                        <div className='sidebar-call-to-action mt-3 text-center'>
                            <img src="/images/call-to-acctio3.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="/images/call-to-acctio4.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="/images/call-to-acctio5.webp" alt="n/a" className='img-fluid mb-3'/>
                            <img src="/images/call-to-acctio6.webp" alt="n/a" className='img-fluid mb-3'/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
// function fetchProductData(currentPage: number, pageSize: number) {
//     throw new Error('Function not implemented.');
// }

