import React from 'react'

import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import config from '../../config';
import axios from 'axios';
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
    created_at: string;
    updated_at: string;
}
export default function Page(): JSX.Element {
    let id = useParams<{ id: string }>().id;
    // const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<PageResponse | null>(null);
    useEffect(() => {
        window.scrollTo(0, 0) 
        const fetchProductData = async () => {
            try {
                if (id) {
                    setLoading(true);
                    const response = await axios.get(`${config.API_URL_LIVE}${config.PAGE_URL}/${id}`);
                    setPage(response.data.data); // Assuming the API response contains an array of category objects
                    setLoading(false);
                }
                else {
                    setLoading(true);
                    const response = await axios.get(`${config.API_URL_LIVE}${config.PAGE_URL}`);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
  
        fetchProductData();
        // console.log('Prams id' ,id)
    }, [id]);
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
                {loading && <div>Loading...</div>}
                <div className='row'>
                    <div className='col-md-12'>
                        <h1>
                            {page?.title && <span dangerouslySetInnerHTML={{ __html: page?.title }} />}
                        </h1>
                        <div>
                            {page?.description && <span dangerouslySetInnerHTML={{ __html: page?.description }} />}
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}