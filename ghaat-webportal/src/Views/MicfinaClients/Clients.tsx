import React from 'react';

// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
import config from '../../config';
import { Link, useParams } from 'react-router-dom';

export default function Clients(): JSX.Element {
  const { id } = useParams<{ id: string }>();  

  return (
    <div className='product-page'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-10 mx-auto rounded'>
                    <div className='product-card-area'>
                        <div className='d-flex justify-content-between w-100 flex-sm-nowrap flex-wrap'>
                            <h3 className='search-reasult1 mt-3 text-success fw-bold'>
                                MicFina - ক্লায়েন্টস
                            </h3>
                            <div className='search-filter d-flex align-items-center'>                                
                                <form className="row g-3">                                    
                                    <div className="col-auto">
                                        <input type="search" className="form-control" placeholder="Search" aria-label="Search" />
                                    </div>
                                </form>                                
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/addin.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/proyash.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/pidim.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/nrds.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/mamta.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/jagoroni.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/gup.jpg" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-md-3 text-center my-2'>
                                <div className="card-body p-1 border bg-white rounded">
                                    <Link to={`/product_details/`}>
                                        <img src="/images/ghrm/dsk.png" alt="n/a" className='img-fluid' />
                                        <p className=" m-0 text-align-right card-content"></p>
                                    </Link>
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
