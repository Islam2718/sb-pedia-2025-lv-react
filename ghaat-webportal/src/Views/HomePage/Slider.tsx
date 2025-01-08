import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
interface Banner {
  id: number;
  title: string;
  description: string;
  url: string;
  thumb: string | null;
}
function Slider() {
  const [index, setIndex] = useState(0);
  const phrases = ['গ্রামীণ ই হাট ', 'আপনার বিক্রি শুরু করুন...', 'আপনার বিক্রয় বিজ্ঞাপন পোস্ট করুন...', 'ফ্রী অ্যাকাউন্ট তৈরি করুন...' ];
  const [typing, setTyping] = useState(true);
  const [banner, setBanner] = useState<Banner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Navigate to the product page with the search key in the URL
      navigate(`/product?search-key=${searchTerm}`);
  };
  useEffect(() => {
    const fetchBannerData = async () => {
        try {
            const response = await axios.get(`${config.API_URL_LIVE}${config.ADS_URL}`);
            setBanner(response.data); // Assuming the API response contains an array of category objects
            // console.log('_banner', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };  

    fetchBannerData();
}, []);



  useEffect(() => {
    const timeout = setTimeout(() => {
      setTyping(false); // Stop typing animation after 2 seconds
      setTimeout(() => {
        setTyping(true); // Start backspace animation after 2 seconds
        setIndex(prevIndex => (prevIndex + 1) % phrases.length);
      }, 2499);
    }, 2499);
    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, [index]);

  const chunks = [];
  const chunkSize = 9;
  for (let i = 0; i < banner.length; i += chunkSize) {
    chunks.push(banner.slice(i, i + chunkSize));
  }
  return (
    <div>
      <div className="banner">
          <div className="container">
              <div className="row">
                  <div className="col-lg-6 col-md-6 banner-contant">
                      <div className='banner-padding w-100'>
                        <h3 className='banner-title'>পণ্য বিক্রি করার সেরা জায়গা </h3>
                        <h1 className='banner-title'>
                          <span>
                            {typing && <span className="typing-animation">{phrases[index]} |</span>}
                            {!typing && <span className="backspace-animation">{phrases[index]} |</span>}
                            {/* <span className="caret-animation">|</span> */}
                          </span>
                        </h1>                    
                          <p className='pb-2'>গ্রামীণ ই হাটে স্বাগতম। আপনার পণ্য পোস্ট করার জন্য একটি অ্যাকাউন্ট তৈরি করুন ।</p>
                          <form className="d-flex search-bar-banner" onSubmit={handleSearch}>                          
                            <img src="./images/clipboard.webp" alt="n/a" className='img-fluid clipboard'/>
                            <input className="form-control me-2" type="search" placeholder="আপনার কীওয়ার্ড লিখুন" aria-label="Search" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                            <button className="btn btn0 btn-theme" type="submit">খুজুন  <i className="fa-solid fa-magnifying-glass f"></i></button>
                          </form>
                          {/* <p className='pt-3 d-flex'>
                            <a href="#0">ইলেকট্রনিক</a>  
                            <a href="#0">চাকরি</a>  
                            <a href="#0">হস্তশিল্প</a>  
                            <a href="#0">মৃত্শিল্প</a>  
                            <div className="dropdown">
                              <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ...
                              </button>
                              <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#0">অটোমোবাইল</a></li>
                                <li><a className="dropdown-item" href="#0">কম্পিউটারের যন্ত্রপাতি </a></li>
                                <li><a className="dropdown-item" href="#0">ফোন এবং ট্যাব</a></li>
                                <li><a className="dropdown-item" href="#0">আসবাবপত্র ও সরঞ্জাম</a></li>
                                <li><a className="dropdown-item" href="#0">ফ্যাশন</a></li>
                                <li><a className="dropdown-item" href="#0">বৈদ্যুতিক</a></li>
                                <li><a className="dropdown-item" href="#0">ফ্রিল্যান্সার</a></li>
                                <li><a className="dropdown-item" href="#0">শিক্ষা</a></li>
                                <li><a className="dropdown-item" href="#0">পরিবহন ও ভাড়া</a></li>
                                <li><a className="dropdown-item" href="#0">খাদ্য</a></li>
                                <li><a className="dropdown-item" href="#0">আবাসন</a></li>
                              </ul>
                            </div> 
                          </p> */}
                      </div>
                  </div>
                  <div className="col-lg-6 col-md-6 banner-contant banner-right">                    
                    <div className='banner-padding-right w-100'>                      
                      <div className='row'>
                      <div className='col-lg-9 col-xl-6 col-md-12 col-sm-12 mx-left'>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            freeMode={true}
                            pagination={{
                              clickable: true,
                            }}
                            modules={[FreeMode, Pagination]}
                            className="mySwiper"
                          >
                           
                          <SwiperSlide>
                            <div className="row p-0">
                            <div className="col-6 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="./ghrm-clients" target='_blank'>
                                <img src={`${config.BASE_URL}images/c1.webp`} className="img-fluid" alt='ghrm' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="https://socialbusinesspedia.com/" target="_blank">
                                  <img src={`${config.BASE_URL}images/c2.webp`} className="img-fluid" alt='sbpedia' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center  text-info rounded">
                                <a href="https://3zero.club/" target="_blank">
                                 <img src={`${config.BASE_URL}images/c3.webp`} className="img-fluid" alt='3zeroClub' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="https://www.grameendanone.net/" target="_blank">
                                 <img src={`${config.BASE_URL}images/c4.webp`} className="img-fluid" alt='' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="https://www.grameenshikkha.com/" target="_blank">
                                 <img src={`${config.BASE_URL}images/c5.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-6 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="./micfina-clients">
                                  <img src={`${config.BASE_URL}images/c6.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c7.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c8.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-6 grid-item-icon my-2">
                              <div className="icon-item row text-center  text-info rounded">
                                <a href="./gbanker-clients">
                                 <img src={`${config.BASE_URL}images/c9.webp`} className="img-fluid" alt='gbanker' />
                                </a>
                              </div>
                            </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="row p-0">                            
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c2.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center  text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c3.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-6 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c1.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c4.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c5.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-6 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c6.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>                            
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c8.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-6 grid-item-icon my-2">
                              <div className="icon-item row text-center  text-info rounded">
                                <a href="./gbanker-clients">
                                  <img src={`${config.BASE_URL}images/c9.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            <div className="col-3 grid-item-icon my-2">
                              <div className="icon-item row text-center text-info rounded">
                                <a href="#0">
                                  <img src={`${config.BASE_URL}images/c7.webp`} className="img-fluid" alt='-' />
                                </a>
                              </div>
                            </div>
                            </div>
                          </SwiperSlide>
                        </Swiper>
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

export default Slider