
import React, { useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
// import required modules
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import config from '../../config';
import axios from 'axios';
interface Category {
  id: number;
  name: string;
  description: string;
  thumb: string;
  status: number;
  sort_order: number | null;
  user_id: number | null;
  created_at: string;
  updated_at: string;
  user: any | null; // You can define a type for the user object if needed
}
interface Product {
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
  updated_at: string;
  user: any | null; // You can define a type for the user object if needed
  category: Category; // Nested category object
}

function Post() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const formatter = new Intl.NumberFormat('bn-BD');

    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get( config.API_URL_LIVE + config.CATEGORY_URL);
                setCategories(response.data.data.data); // Assuming the API response contains an array of category objects
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const fetchProductData = async () => {
            try {
                const response = await axios.get( config.API_URL_LIVE + config.PRODUCT_URL, { headers: { "size": 25, "status": 1 } });
                setProducts(response.data.data.data); // Assuming the API response contains an array of category objects
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCategoryData();
        fetchProductData();
    }, []);
    const firstSixCategories = categories.slice(0, 6); // Slice the first six categories
    const remainingCategories = categories.slice(6); // Slice the remaining categories
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
    <div className='m-0'>
     <div className="link post-area">
        <div>
          <div className='text-end d-lg-block d-none' style={{marginBottom: '-75px'}}>                  
            <img src="images/side-img.webp" className='img-fluid' alt="n/a" style={{ height: '40px'}} />
          </div>
        </div>
        <div className="container  ">
          <div className="row link-list">
            <div className="post-link-container">
              <div className='d-sm-flex d-none'>                
                <ul className="post-link">

                  {firstSixCategories.map(category => (
                    <li key={category.id}><Link to={`/product/${category.id}`} className='active'>{category.name}</Link></li>
                ))}

                </ul>
                <div className="dropdown">
                  <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    ...
                  </button>
                  <ul className="dropdown-menu">
                    {remainingCategories.map(category => (
                        <li key={category.id}><Link className="dropdown-item" to={`product/${category.id}`}>{category.name}</Link></li>
                    ))}
                  </ul>
                </div> 
              </div>                
                {/* <div>                  
                  <img src="images/side-img.png" className='img-fluid' alt="n/a" />
                </div> */}
              </div>            
          </div>
        </div>        
    </div>
    <div className="large-grid">
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-6 g-4 large-grid-first">
                  <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      freeMode={true}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="Swiper"
                    >
                    <SwiperSlide>
                      <div className='slider-box'>
                        <img src="./images/post_banner.webp" alt="n/a" className='img-fluid w-100' />
                        <div className='content-area'>                          
                          <p>বাংলাদেশের তরুণ উদ্যোক্তা</p>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className='slider-box'>
                        <img src="./images/post_banner.webp" alt="n/a" className='img-fluid  w-100' />
                        <div className='cotent-feature'>
                          <span>নবীন উদ্যোক্তা</span>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className='slider-box'>
                        <img src="./images/post_banner.webp" alt="n/a" className='img-fluid w-100' /> 
                        <div className='content-area'>                          
                          <p>বাংলাদেশের তরুণ উদ্যোক্তা</p>
                        </div>
                        <div className='cotent-feature'>
                          <span>নবীন উদ্যোক্তা</span>
                        </div>                       
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>

               <div className="col-3 g-4 d-lg-block d-none">
                <div className="card ">
                  <img className="card-img-top h-90 rounded img-fluid" src={config.FILE_URL + "gbanker-mfi-solution.webp"} alt="gbanker-logo"/>                  
                </div>
              </div>
               <div className="col-3 g-4 d-lg-block d-none">
                <div className="card  text-center">
                  <img className="card-img-top h-90 rounded img-fluid" src={config.FILE_URL + "ghrm.webp"} alt="ghrm logo" />
                </div>
              </div>
            </div>
        </div>
    </div>
    <div className="grid-section-two">
      <div className="container">
      <div className="row">
    {products.map((product, index) => (
        <React.Fragment key={product.id}>
            <div className="col-2 g-4 card-width">
                <div className="card h-100">
                    <Link to={`/product_details/${product.id}`}>
                        {product.thumb ? (
                            <img className="card-img-top h-90 rounded" src={config.FILE_URL + product.thumb} alt="Product thumbnail" />
                        ) : (
                            <img className="card-img-top h-90 rounded" src="images/thumb-product.webp" alt="Product thumbnail" />
                        )}
                    </Link>
                    <div className="card-body p-1">
                        <Link to={`/product_details/${product.id}`}>
                            <p className="m-0 text-align-right card-content mt-2">{product.name}</p>
                        </Link>
                        <div className="d-flex justify-content-between p-0 mt-1 mb-2">
                            <p className="info-content m-0"><i className="bi bi-geo-alt"></i> ঢাকা, বাংলাদেশ</p>
                        </div>
                        <div className="d-flex justify-content-between p-0 m-0">
                            <p className="info-price m-0 fw-bold">৳: {formatter.format(product.price)}</p>
                            <p className="info-content m-0">{displayTimes[index]}</p>
                        </div>
                    </div>
                </div>
            </div>
            {(index + 1) % 10 === 0 && 
            <div className="row card-green-container">
              <div className="row add-position">
                  <img src="images/call-to-acction.webp" alt="n/a" className='m-0 p-0 rounded img-fluid'/>
              </div>
            </div>            
            }
        </React.Fragment>
    ))}
</div>
      </div>
    </div>

    <div className="card-green-container">
      <div className="container add-position">
          <img src="images/call-to-acction.webp" alt="n/a" className='img-fluid'/>
      </div>
    </div>

    <div className="nobin-section">
        <div className="container">
            <div className="row">
              <div className="col-4 m-0 p-0 nobin-p ">
                <img src="images/call-to-acction2.webp" alt="n/a" className='img-fluid ms-2'/>
              </div>
            </div> 
        </div>
    </div>
    </div>
  )
}

export default Post