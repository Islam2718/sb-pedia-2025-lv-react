import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import config from '../config';
import { Link } from 'react-router-dom';

interface PageResponse {
  id: number;
  name: string;
  title: string;
  description: string;
  thumb: string;
  banner_img: string | null;
  slug: string;
  page_template: string | null;
  tags: string[] | null;
  meta_key: string | null;
  meta_description: string | null;
  status: "0" | "1"; // Assuming status can only be "0" or "1"
}
export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState<PageResponse[]>([]);

  // Show button when user scrolls down 100px
  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  });


  useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await axios.get( config.API_URL_LIVE + config.PAGE_URL);
            setPage(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      };
      fetchData();
  },[]);
  return (
    <div>       
      <div className="side-img">
        <div className="container-fluid">
            <div className="row">
              <div className="col-12 m-5 float-end">
                <img src={`${process.env.PUBLIC_URL}/images/side-img.png`} alt="" />
              </div>
            </div> 
        </div>
      </div>
      <div className="footer">
          <div className="container">
              <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <h4>আমাদের কথা</h4>
                    <ul>
                    {page.map((item, index) => (
                      index >= 0 && index < 3 && (
                        <li key={item.id}>
                          <a href={`../page/`+item.id}>{item.title}</a>
                        </li>
                      )
                    ))}
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <h4>আরো জানুন</h4>
                    <ul>
                    {page.map((item, index) => (
                        index >= 3 && index < 6 && (
                          <li key={item.id}>
                            <a href={`../page/`+item.id}>{item.title}</a>
                          </li>
                        )
                      ))}
                    </ul>                    
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <h4>সাহায্য এবং যোগাযোগ</h4>
                    <ul>
                    {page.map((item, index) => (
                        index >= 6 && index < 9 && (
                          <li key={item.id}>
                            <a href={`../page/`+item.id}>{item.title}</a>
                          </li>
                        )
                      ))}
                      <li><a href="#0">যোগাযোগ করুন</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6">
                    <h4>গ্রামীণ ই হাট </h4>
                    <p className='address mb-0'>ঠিকানা : টেলিকম ভবন (লেভেল-৭) ৫৩/১, বক্স  নগর , চিড়িয়াখানা রোড, মিরপুর-১, ঢাকা-১২১৬. </p>
                    <p className='address mb-0'> ফোন: +৮৮ ০২ ৪৪ ৮০ ০০</p>
                    <p className='address '>ইমেইল: info@grameenehaat.com</p>
                    <div className="social">                  
                      <ul>
                        <li><a href="#0" className='facebook'><i className="fa-brands fa-facebook-f"></i></a></li>
                        <li><a href="#0" className='youtube'><i className="fa-brands fa-youtube"></i></a></li>
                        <li><a href="#0" className='linkedin'><i className="fa-brands fa-linkedin-in"></i></a></li>
                        <li><a href="#0" className='pinterest'><i className="fa-brands fa-pinterest-p"></i></a></li>
                        <li><a href="#0" className='twitter'><i className="fa-brands fa-twitter"></i></a></li>
                        <li><a href="#0" className='instagram'><i className="fa-brands fa-instagram"></i></a></li>
                      </ul>
                    </div>
                  </div>
              </div>
          </div>
      </div> 
      <hr className="full-hr" />
      <div className="payment d-none">        
          <div className="container payment-container">
            {/* <div className='payment'>
              <img  src={`${process.env.PUBLIC_URL}/images/bikash.jpg`} alt="#0" className='img-fluid'/>
              <img src={`${process.env.PUBLIC_URL}/images/rocket.jpg`} alt="#0" className='img-fluid'/>
              <img src={`${process.env.PUBLIC_URL}/images/Nogod.jpg`} alt="#0" className='img-fluid'/>
              <img src={`${process.env.PUBLIC_URL}/images/ssl.jpg`} alt="#0" className='img-fluid'/>    
            </div>             */}
          </div>
      </div>  
      <div className="footer-bottom">
          <div className="container">
              <div className="row">
                  <div className="col-lg-6 d-none">
                      {/* <p className='footer-link'>We Accept Online Payment</p> */}
                  </div>
                  <div className="col-lg-12 text-center py-1">
                    <p className="footer-bottom-right1">&copy; 2024. All rights reserved. <Link to="https://grameen.technology/" target='_blank' style={{color:'#519259', fontWeight:'bold'}}>Grameen Communications</Link></p>
                  </div>
              </div>
          </div>
      </div>
      <div className={`scroll-to-top ${isVisible ? 'show' : ''}`} onClick={scrollToTop}>
        <i className="fa fa-arrow-up"></i>
      </div>
    </div>
  )
}
