import React from 'react';
import { Swiper,  SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';

import { Helmet } from 'react-helmet-async';
// import required modules

// import required modules
import { Pagination, FreeMode , Navigation, HashNavigation} from 'swiper/modules';

interface Product {
    category: any;
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description: string;
    thumb: string | null;
    images?: string;
    price: number;
    unit: string;
    status: string;
    category_id: number;
    user_id: number | null;
    phone: string;
    created_at: string;
    updated_at: string;
    web_url: string;
    user: any | null; // You can define a type for the user object if needed
    related_products?: any[];
  }
export default function ProductDetails() {
    const { id } = useParams<{ id: string }>(); // Extract the product ID from the URL parameter
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedproduct, setRelatedProduct] = useState<Product | null>(null);
    // const [thumbsSwiper, setThumbsSwiper] = useState<typeof Swiper | null>(null);
    // const thumbsSwiperRef = useRef<typeof Swiper | null>(null);
    const formatter = new Intl.NumberFormat('bn-BD');
    const [isValidUrl, setIsValidUrl] = useState(false);
    // const thumbsSwiper = useRef<SwiperRef>(null);

    const productUrl = `${window.location.origin}/product/${id}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}`;
    const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${productUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${productUrl}`;
    const instagramShareUrl = `https://www.instagram.com/?url=${productUrl}`; // Note: Instagram does not support direct URL sharing
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}/${id}`);
                setProduct(response.data.data.product); // Assuming the API response contains the product details
                setRelatedProduct(response.data.data.related_products); // Assuming the API response contains the product details
                //  setThumbsSwiper(response.data.data.images);
                // Check if the web_url is a valid URL and not null or 'n/a'
                const productData = response.data.data.product;
                const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' + // domain name and extension
                    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
                
                const isValid = productData.web_url && urlPattern.test(productData.web_url) && productData.web_url.toLowerCase() !== 'n/a';
                setIsValidUrl(isValid);
                // console.log(thumbsSwiper);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
        fetchProductDetails();
    }, [id]); // Fetch product details whenever the product ID changes
    
    if (!product) {
        return <div className="container my-5"><div className="col-12 mx-auto alert alert-success text-center">প্রোডাক্ট খুজে পাওয়া যায় নি...</div></div>;
    }

    let images: string[] = [];
    if (typeof product.images === 'string') {
      images = product.images.split(',');
    } else if (Array.isArray(product.images)) {
      images = product.images;
    }

    // Calculate the difference in days
    let then = new Date(product.created_at);
    let now = new Date();
    const diffInMs = now.getTime() - then.getTime();
    // const daysAgo = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    // Calculate difference in various units
    const secondsAgo = Math.round(diffInMs / 1000);
    const minutesAgo = Math.round(secondsAgo / 60);
    const hoursAgo = Math.round(minutesAgo / 60);
    const daysAgo = Math.round(hoursAgo / 24);
    const monthsAgo = Math.round(daysAgo / 30); // Approximate calculation for months
    const yearsAgo = Math.round(monthsAgo / 12);
    // Determine display text
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

    return (
        <>
            <Helmet>                
                {/* <title>{product.name}</title> */}
                <meta name="description" content={product.description} />
                {/* <meta name="keywords" content={product.short_description.join(', ')} /> */}
                <meta name="keywords" content={product.short_description} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description} />
                <meta property="og:image" content={`${config.FILE_URL}${product.thumb}`} />
                <meta property="og:url" content={`https://grameen-ehaat.com/product/${product.id}`} />
                <meta name="twitter:title" content={product.name} />
                <meta name="twitter:description" content={product.description} />
                <meta name="twitter:image" content={`${config.FILE_URL}${product.thumb}`} />               
            </Helmet>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-9 col-md-9 col-sm-12 mx-auto'>
                        <div className='product-details-page'>
                            <div className='product-details'>
                                <div className='row'>
                                    <div className='col-lg-7 col-md-7 col-sm-12'>
                                    {product && (
                                    <div className='product-details'>
                                        <div className='product-image'>
                                            <Swiper
                                            spaceBetween={10}
                                            navigation={true}
                                            modules={[Pagination, Navigation, HashNavigation, FreeMode]}
                                            pagination={{ clickable: true }}
                                            className="mySwiper2"
                                            >
                                                <SwiperSlide>                                                
                                                    {/* if thumb not null  */}
                                                    {product.thumb ? (                                                
                                                        <img src={`${config.FILE_URL}${product.thumb}`} className="img-fluid product-details-img" alt={`${product.name}`} />
                                                    ) : (
                                                        <img className="card-img-top h-100 rounded" src="images/thumb-product.png" alt={`${product.name}`} />
                                                    )}                                                
                                                </SwiperSlide>         
                                                {Array.isArray(images) && images.map((image) => (
                                                    <SwiperSlide key={image}>
                                                        <img src={`${config.FILE_URL}${image}`} className="img-fluid product-details-img" alt={`${product.name}`} />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </div> 
                                        <div className='d-flex my-3'>
                                        {Array.isArray(images) && images.map((image) => (
                                            <div className='col-3'>
                                                <div className='m-2'>
                                                <img src={`${config.FILE_URL}${image}`} className="img-fluid product-details-img rounded border" alt={`${product.name}`} />
                                                </div>
                                            </div>
                                        ))}
                                        </div>                                   
                                    </div>
                                    )}
                                    </div>
                                    <div className='col-lg-5 col-md-5 col-sm-12'>                                    
                                        <div className='product-content'>
                                            <h2>
                                                {product.name}
                                                {/* &nbsp; &nbsp; <small className='text-muted'><i className="fa-regular fa-eye"></i> 62</small> */}
                                            </h2>
                                            <p className='description pt-1'>
                                                <span dangerouslySetInnerHTML={{ __html: product.short_description }} />
                                            </p>
                                            <p className='price'>
                                                মূল্যঃ {formatter.format(product.price)}
                                                {/* <span>Negotiable</span> */}
                                            </p>
                                            <p className='date'>{displaytime}</p>
                                        </div>                                    
                                    </div> 
                                </div>  
                                <div className='nav-tab-area'>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">বিস্তারিত</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">মন্তব্য</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active p-3" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
                                        <span dangerouslySetInnerHTML={{ __html: product.description }} />
                                    </div>
                                    <div className="tab-pane fade p-3" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
                                        মন্তব্য নেই
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="row card-green-container">
                            <div className="row add-position">
                                <img src={config.FILE_URL+'call-to-acction.png'} className="img-fluid rounded p-0 m-0" alt='-' />
                            </div>
                        </div>           
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 mx-auto'>
                        <div className='product-details-page'>                        
                            <div className='product-details'>
                            {product && (
                                <div className='product-details'>                                
                                    <div className='product-content'>
                                        <div className="social py-3">
                                            <h5 className='text-center product-conten-header' >শেয়ার করুণ</h5>
                                            <ul className="d-flex justify-content-center">
                                                <li><a href={facebookShareUrl} className='facebook' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                <li><a href={linkedinShareUrl} className='linkedin' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                <li><a href={twitterShareUrl} className='twitter' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-twitter"></i></a></li>
                                                <li><a href={instagramShareUrl} className='instagram' target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                                            </ul>
                                        </div>
                                        <div className="userinfo py-3">
                                            <h5 className='text-center product-conten-header' >বিজ্ঞাপন দাতা</h5>
                                            <p> 
                                                Name: <strong>{product?.user.firstname} {product?.user.lastname}</strong>  <br/>
                                                Address: {product?.user.address}
                                            </p>
                                            <a href={`tel:${product?.user.phone}`}  type='button' className='btn btn-theme w-100'> Call: {product?.user.phone} </a>                                        
                                            {isValidUrl !== null && isValidUrl && (
                                            <a href={product.web_url} type='button' className='btn btn-theme w-100 mt-3' target="_blank" rel="noopener noreferrer">
                                                আরো দেখুন
                                            </a> 
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                            <div className='product-details my-3'>                                
                                <div className='product-content'>
                                    <div className="py-0">    
                                        <h5 className='text-center product-conten-header'>সতর্কতা</h5>
                                        <ul>
                                            <li>পন্যের ব্যাপারে Grameen eHaat কোন দায়িত্ব গ্রহন করে না।</li>
                                            <li>লেনদেন এর ব্যাপারে Gramen eHaat কোন দায়িত্ব গ্রহন করে না।</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-9 col-md-9 col-sm-12 mx-auto'>                   
                        <div className='related-product'>
                            <div className='section-title'>
                                <h2 className='text-center border py-2' style={{fontWeight: 'bold', fontSize: '24px', color: '#519259'}}>অনুরূপ বিজ্ঞাপনসমূহ</h2>
                            </div>
                            {/* loop related product */}
                            <div className='product-grid row'>
                                {relatedproduct && Array.isArray(relatedproduct) && relatedproduct.length > 0 && (
                                    relatedproduct.map((relatedProduct, index) => (
                                        <div key={index} className="col-lg-3 col-md-3 col-sm-6">
                                            <div className="card my-3">
                                                <Link to={`/product_details/${relatedProduct.id}`}>
                                                    {relatedProduct.thumb ? (
                                                        <img className="card-img-top h-90 rounded" src={config.FILE_URL + relatedProduct.thumb} alt="Product thumbnail" />
                                                    ) : (
                                                        <img className="card-img-top h-90 rounded" src="./images/thumb-product.png" alt="Product thumbnail" />
                                                    )}
                                                </Link>                                            
                                                <div className="card-body p-1">
                                                    <Link to={`/product_details/${relatedProduct.id}`}>
                                                        <p className="m-0 text-align-right card-content">{relatedProduct.name}</p>
                                                    </Link>
                                                    <div className="p-0 m-0">
                                                        <p className="info-content m-0 text-end">৳: {formatter.format(relatedProduct.price)}</p>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 mx-auto'>                    
                        <div className='sidebar-call-to-action mt-3'>
                            <img src={config.FILE_URL + "call-to-acctio4.webp"} alt="" className='img-fluid mb-3'/>
                            <img src={config.FILE_URL + "call-to-acctio5.webp"} alt="" className='img-fluid mb-3'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}