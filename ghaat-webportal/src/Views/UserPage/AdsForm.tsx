/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react'
// import { useParams } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import config from '../../config';
// import FileUpload from '../../Components/FielUpload';
import { useDropzone } from 'react-dropzone';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Sidebar from '../UserPage/Siderbar';

// category interface 
interface Category {
    id: number;
    name: string;
    thumb: string;
    description: string;
    status: string;
}
interface Division {
    id: number;
    title: string;
    discription: string;
    status: string;
}
interface District {
    id: number;
    parent_id: number;
    title: string;
    discription: string;
    status: string;
}
// product interface 
// interface Product {
//     id: number;
//     name: string;
//     slug: string;
//     description: string;
//     short_description: string;
//     thumb: string ;
//     images: string[] ;
//     price: number;
//     unit: string;
//     division_name: string;
//     status: string;
//     category_id: number;
//     user_id: number ;
//     created_at: string;
//     updated_at: string;
//     user: any ;
//     category: Category;
// }

interface FormData {
    name: string;
    slug: string;
    description: string | null;
    short_description: any | null;
    thumb: string;
    images: string;
    price: string;
    division_name: string;
    division_id: string;
    district_name: string;
    unit: string;
    status: string;
    category_id: number;
    // division: string | null;
    user_id: number | null;
    web_url: string;
    [key: string]: any; // Index signature to allow any string key
}

// interface Upload{
//     thumb: string | null;
//     images: string[] | null;
// }

export default function AdsForm() {
    const userInfoString = localStorage.getItem('userInfo');
    // get parameter dta from url
    const { id } = useParams();
    console.log('_product_url_id', id);
    const formatter = new Intl.NumberFormat('bn-BD');
    // Parse the userInfoString to convert it back to an object
    const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
    const [Category, setCategories] = useState<Category[]>([]); 
    const [division, setDivisions] = useState<Division[]>([]); 
    const [district, setDistricts] = useState<District[]>([]); 
    const [formData, setFormData] = useState<FormData>({
        name: '',
        slug: '',
        description: ' ',
        short_description: ' ',
        thumb: '',
        images: '', // Initialize images as an empty string array
        price: '',
        division_name : '',
        division_id : '',
        district_name : '',
        unit: '',
        status: '0',
        category_id: 0,
        user_id: userInfo?.id, 
        web_url: '',
        phone: '',
      });
      // const [imageData, setImage] = useState<Upload>({
      //   thumb: '',
      //   images: [] as string[],
      // });
      const [thumbPreview, setThumbPreview] = useState<string | undefined>(undefined);
      const [imagePreviews, setImagePreviews] = useState<string[]>([]);
      // const [photo, setPhoto] = useState<File | null>(null);

      const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined);
      const [selectedFile, setSelectedFile] = useState<File | null>(null);
      const [loadingimage, setLoadingimage] = useState(false);
      const handleThumbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log('File:', file);
            handleUploadButtonClick();
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
              setThumbPreview(result);
            }
          };
          reader.readAsDataURL(file);
        } else {
          setThumbPreview(undefined);
        }
      };
    
      const handleUploadButtonClick = async () => {
        if (selectedFile) {
          setLoadingimage(true);
          const formData = new FormData();
          formData.append('file', selectedFile);
    
          try {            
            const response = await axios.post(`${config.API_URL_LIVE}upload-single`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace yourToken with your actual token
              },
              onUploadProgress: (progressEvent: any) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
              },
            });
    
            if (response.status === 200) {
                const thumbUrl = response.data.url;
                setThumbPreview(thumbUrl); 
                const uploadedThumbUrls: string[] = [];
                uploadedThumbUrls.push(thumbUrl); 
                // setFormData(prevState => ({ ...prevState, thumb: JSON.stringify(uploadedThumbUrls) }));    
                setFormData(prevState => ({ ...prevState, thumb: JSON.stringify(thumbUrl).replace(/"/g, '') }));           
            }
            setLoadingimage(false);
          } catch (error) {
            console.error('Error uploading thumb image:', error);
            setLoadingimage(false);
          }
        }
      };
    //IMAGE SET 
    // const thumbset = () => {
    //   // Create a copy of the current formData state
    //   const cleanThumb = formData.thumb ? JSON.parse(formData.thumb).join(',') : '';  
    //   formData.thumb = cleanThumb;
    // }
      const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
      console.log(selectedFiles);
      const [imagesloaded, setImagesloaded] = useState<boolean>(false);
      const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        setSelectedFiles(files);      
        if (files) {
          // const previews: string[] = [];
          const fileReadPromises = [];
      
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();      
            fileReadPromises.push(
              new Promise<string>((resolve) => {
                reader.onload = () => {
                  const result = reader.result;
                  if (typeof result === 'string') {
                    resolve(result);
                  }
                };      
                reader.readAsDataURL(file);
              })
            );
          }

          const filePreviews = await Promise.all(fileReadPromises);
          setImagePreviews(filePreviews);
          // Call the upload function after previews are set
          handleUploadButtonClickImage(files);      
        } else {
          setImagePreviews([]);
        }        
      };
      const [allUploadedFiles, setAllUploadedFiles] = useState<string[]>([]);

      const handleUploadButtonClickImage = async (files: FileList) => {
        if (files) {
          setImagesloaded(true);
          const uploadedImageUrls: string[] = [];
          const promises: Promise<any>[] = [];

          for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            console.log('File:', files[i]);

            const promise = axios.post(`${config.API_URL_LIVE}upload-single`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace yourToken with your actual token
              },
              onUploadProgress: (progressEvent: any) => {
                const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                setUploadProgress(progress);
              },
            }).then((response) => {
              if (response.status === 200) {
                const url = response.data.url;
                console.log('Uploaded image URL:', url);
                uploadedImageUrls.push(url);
              }
              setImagesloaded(false);
            }).catch((error) => {
              console.error('Error uploading image:', error);
            });
            promises.push(promise);
          }
          await Promise.all(promises);
          if (uploadedImageUrls.length > 0) {
            formData.thumb = uploadedImageUrls[0];
          }
          setImagesloaded(false);

          // Merge new URLs with existing ones
          setAllUploadedFiles((prevUrls) => [...prevUrls, ...uploadedImageUrls]);
      
          console.log('Uploaded image URLs:', uploadedImageUrls);
          formData.images = JSON.stringify(uploadedImageUrls);
          const cleanImages = formData.images ? JSON.parse(formData.images).join(',') : '';
          formData.images = cleanImages;
          const joinedImageUrls = [...allUploadedFiles, ...uploadedImageUrls].join(',');
          setFormData((prevState) => ({
            ...prevState,
            images: joinedImageUrls,
          }));
          // imgaesset()
          setImagePreviews([]);
        }
      };
          //IMAGE SET 
    // const imgaesset = () => {
    //   const cleanImages = formData.images ? JSON.parse(formData.images).join(',') : '';
    //   formData.images = cleanImages;
    //   console.log('FormData:', formData.images);
    // }

    //delete image
    const handleDeleteImage = async (image: string) => {
      try {
        // Make a DELETE request to the server
        await axios.get(`${config.API_URL_LIVE}remove-file/${image}`, {
          // data: { fileName: image },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace yourToken with your actual token
          },
        });
    
        // Remove the image from the frontend state
        setAllUploadedFiles((prevFiles) => prevFiles.filter((file) => file !== image));
        const updatedImages = formData.images.split(',').filter((img) => img !== image).join(',');
        setFormData((prevState) => ({
          ...prevState,
          images: updatedImages,
        }));
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => {
          const updatedFormData = {
              ...prevFormData,
              [name]: value,
          };
  
          if (name === 'name') {
              updatedFormData.slug = generateSlug(value);
          } else if (name === 'division_name') {
              const selectedDivision = division.find((division: { title: string; }) => division.title === value);
              updatedFormData.division_name = value;
              updatedFormData.division_id = selectedDivision ? selectedDivision.id.toString() : '';
          }
  
          return updatedFormData;
      });
    };
  
    const generateSlug = (text: string) => {
      return text
          .normalize('NFD') // Normalize the text to decompose combined characters
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-') // Replace spaces with -
          .replace(/[^\p{L}\p{N}-]+/gu, '') // Remove all non-word characters except letters and numbers
          .replace(/--+/g, '-'); // Replace multiple - with a single -
    };

    // const Image: HTMLImageElement[] = [];
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formDataCopy = { ...formData };      
        formDataCopy.short_description = editorData;
        formDataCopy.description = editorData2;
        // console.log('Form data:', formDataCopy);

        if(formDataCopy.thumb === '') {
          document.getElementById('thumb-btn')?.focus();
        }else if (formDataCopy.images === '') {
          document.getElementById('images-btn')?.focus();
        }
        else {
          if(!id){            
            try {
              const response = await axios.post(`${config.API_URL_LIVE}${config.PRODUCT_URL}`, formDataCopy, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              if(response.status === 201) {
                  window.location.replace('/ads');
              }
            } catch (error) {
              console.error('Error adding product:', error);
            }
          }else{
            try {
              alert('update hobe');
              const response = await axios.put(`${config.API_URL_LIVE}${config.PRODUCT_URL}/${id}`, formDataCopy, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              });
              if(response.status === 204) {
                  window.location.replace('/ads');
              }
            } catch (error) {
              console.error('Error adding product:', error);
            }
          }
        }
      };
    
    // const location = useLocation();
    const [loading, setLoading] = useState(false);  
    useEffect(() => {          
        const fetchProductData = async () => {
          try {
              if (id) {
                  setLoading(true);
                  const response = await axios.get(`${config.API_URL_LIVE}${config.PRODUCT_URL}/${id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                      UserId: localStorage.getItem('userId'),
                    },
                  }
                  );
                  setFormData(response.data.data.product); // Assuming the API response contains an array of category objects
                  setSelectedFile(response.data.data.product.thumb);
                  setSelectedFiles(response.data.data.product.images);
                  setLoading(false);
              } else {
                setFormData({
                  name: '',
                  slug: '',
                  description: ' ',
                  short_description: ' ',
                  thumb: '',
                  images: '',
                  price: '',
                  unit: '',
                  status: '0',
                  category_id: 0,
                  division_name : '',
                  division_id : '',
                  district_name : '',
                  user_id: userInfo?.id,
                  phone: userInfo?.phone,
                  web_url: '',
                });
                  setLoading(false);
                  setImagePreviews([]);
              }              
          } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
          }
      };
      fetchProductData();
      // console.log('Id:', id);
    },[id, userInfo?.id, userInfo?.phone]);   
    useEffect(() => {
      // category list fetch 
      const fetchCategoryData = async () => {
            try {
              setLoading(true)
                const response = await axios.get(`${config.API_URL_LIVE}${config.CATEGORY_URL}`);
                setCategories(response.data.data.data);
                // console.log('_Category', Category);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
            }
        }
      fetchCategoryData();
    }, []);
  
    // Fetch Divisions
    useEffect(() => {
        const fetchDivisionData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${config.API_URL_LIVE}${config.LOCATION_URL}?division=true`);
                setDivisions(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching division data:', error);
                setLoading(false);
            }
        };
        fetchDivisionData();
    }, []);

    // Fetch Districts based on selected division
    useEffect(() => {
      if (formData.division_id) {
          const fetchDistrictData = async () => {
              try {
                // setLoading(true);
                const response = await axios.get(`${config.API_URL_LIVE}${config.LOCATION_URL}?division=${formData.division_id}`);
                setDistricts(response.data.data);
                console.log('divition', formData);
              } catch (error) {
                console.error('Error fetching district data:', error);
              }
          };
          fetchDistrictData();
      } else {
          setDistricts([]);
      }
  }, [formData]);

    const [editorData, setEditorData] = useState( formData.short_description);
    useEffect(() => {
      const timeout = setTimeout(() => {
        if(formData.short_description && formData.description){
          setEditorData(formData.short_description);
          setEditorData2(formData.description);
        } else {
          setEditorData('');
          setEditorData2('');
        }
      }, 100); // Delay in milliseconds, for example, 1000ms (1 second)
    
      return () => clearTimeout(timeout);
    }, [formData.short_description, formData.description]);

    const [editorData2, setEditorData2] = useState( formData.description);

    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData(data);
    };
    const handleEditorChange2 = (event: any, editor: any) => {
        const data = editor.getData();
        setEditorData2(data);
    };
    // const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    const { isDragActive } = useDropzone({ 
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        // console.log('File:', file);
        if (file) {
          // handleUploadButtonClick(file);
        }        
      }
     });
     //file drag and drop
     const inputRef = useRef<HTMLInputElement>(null);
     const handleDragEnter = (e: { preventDefault: () => void; stopPropagation: () => void; currentTarget: { style: { backgroundColor: string; }; }; }) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.style.backgroundColor = '#FABB51';
    };
  
    const handleDragLeave = (e: { preventDefault: () => void; stopPropagation: () => void; currentTarget: { style: { backgroundColor: string; }; }; }) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.style.backgroundColor = '#ffffff';
    };
  
    const handleDrop = (e: { preventDefault: () => void; stopPropagation: () => void; currentTarget: { style: { backgroundColor: string; }; }; dataTransfer: { files: any; }; }) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.style.backgroundColor = '#ffffff';
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const event = new MouseEvent('click');
        if(inputRef.current){
          inputRef.current.dispatchEvent(event);
        }
      }
    };

    const changeimagetothumb = (getThumb: string) => {
      setFormData(prevFormData => ({
        ...prevFormData,
        thumb: getThumb
      }));
      console.log('Thumb:', formData.thumb);
    }
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
                                <span className='fw-bold h5'> <i className="fa fa-dashboard"></i> বিজ্ঞাপন তৈরি করুন</span>
                            </p>
                            <div className='search-filter d-flex align-items-center'>
                              <form className="row g-3">
                                  <div className="col-auto me-1">
                                      <i className="fa-solid fa-bell"></i> {formatter.format(0)}
                                  </div>
                                  <div className="col-auto me-1">
                                      <i className='fa fa-envelope'></i> {formatter.format(0)}
                                  </div>
                              </form>                               
                            </div>
                        </div> 
                        <div className='card1'>
                            <div className="create-page bg-white p-4 rounded">
                              {loading && loading? (
                                        <div className='text-center'>
                                            <div className="spinner-grow text-yellow" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                        )
                                        :
                                        (
                                            <>
                                              <form onSubmit={handleSubmit}>
                                                  <p className="heading-text-center"></p>
                                                  <h3 className="heading-border text-start mb-3 font-bold pb-3">বিজ্ঞাপন সংযুক্ত করুন</h3>
                                                  <div className="row">
                                                    <div className="create-form col-md-9">
                                                      {/* <form className="row g-4" onSubmit={handleSubmit}> */}
                                                      <div className="row g-4">  
                                                          <div className="col-md-12">
                                                          <select
                                                              className="form-control input-design"
                                                              name="category_id" // Make sure the name matches the property name in formData
                                                              required
                                                              value={formData.categoryId}
                                                              onChange={handleChange}
                                                              disabled={id == null ? false : true}
                                                              >
                                                              <option value="" className='p-5'>সিলেক্ট ক্যাটেগরি*</option>
                                                              {Category.map((categoryItem, index) => (
                                                                  <option key={index} value={categoryItem.id} selected={categoryItem.id === formData.category_id}> {/* Ensure to convert to string */}
                                                                  <div className='p-5'> {categoryItem.name}</div>
                                                                  </option>
                                                              ))}
                                                          </select>                              
                                                          </div>
                                                          <div className="col-md-12">
                                                              <input
                                                              type="text"
                                                              className="form-control input-design"
                                                              placeholder="টাইটেল যুক্ত করুন*"
                                                              name="name"
                                                              value={formData.name}
                                                              onChange={handleChange}
                                                              required
                                                              />
                                                          </div>
                                                          <div className="col-md-12 d-none">
                                                              <input
                                                              type="text"
                                                              className="form-control input-design"
                                                              placeholder="slug/url পরিবর্তন করুন*"
                                                              name="slug"   
                                                              value={formData.slug}  
                                                              onChange={handleChange}
                                                              required
                                                              readOnly
                                                              />
                                                          </div>
                                                          <div className="col-md-12">
                                                              <label htmlFor="editor" className='form-label'> পন্যের আংশিক বর্ননা</label>
                                                              <CKEditor
                                                                editor={ClassicEditor}
                                                                data={editorData}
                                                                onChange={handleEditorChange}
                                                                onReady={(editor: any) => {
                                                                  // You can do something when the editor is ready
                                                                  editor.config.set('placeholder', 'পন্যের বর্ননা লিখুন');
                                                                }}
                                                                // onChange={(event: any, editor: { getData: () => any; }) => {
                                                                //   const data = editor.getData();
                                                                //   console.log({ event, editor, data });
                                                                // }}
                                                              />
                                                          </div>

                                                          <div className="col-md-12">
                                                          {/* <textarea
                                                              className="form-control input-design"
                                                              placeholder="পন্যের বিস্তারিত বর্ননা লিখুন"
                                                              name="description"
                                                              rows={5}
                                                              value={formData.description}
                                                              onChange={handleBlur}
                                                              ></textarea> */}
                                                              <label htmlFor="editor" className='form-label'> পন্যের সম্পূর্ণ বর্ননা</label> 
                                                              <CKEditor
                                                                editor={ClassicEditor}
                                                                data={editorData2}
                                                                onChange={handleEditorChange2}
                                                                onReady={(editor: any) => {
                                                                  // You can do something when the editor is ready
                                                                  editor.config.set('placeholder', 'পন্যের বর্ননা লিখুন');
                                                                }}
                                                                // onChange={(event: any, editor: { getData: () => any; }) => {
                                                                //   const data = editor.getData();
                                                                //   console.log({ event, editor, data });
                                                                // }}
                                                              />
                                                          </div>
                                                          <div className="col-md-12">
                                                              <input
                                                              type="text"
                                                              className="form-control input-design"
                                                              placeholder="মূল্য*"
                                                              name="price"
                                                              value={formData.price}
                                                              onChange={handleChange}
                                                              required
                                                              />
                                                          </div>
                                                          <div className="col-md-12">
                                                          <select
                                                              className="form-control input-design"
                                                              name="division_name"
                                                              required
                                                              value={formData.division_name}
                                                              onChange={handleChange}
                                                              disabled={id == null ? false : true}
                                                              >
                                                              <option value="" className='p-5'>বিভাগ</option>
                                                              {division.map((divisionItem, index) => (
                                                                  <option key={index} value={divisionItem.title} selected={divisionItem.title === formData.division_name}> {/* Ensure to convert to string */}
                                                                  <div className='p-5'> {divisionItem.title}</div>
                                                                  </option>
                                                              ))}
                                                          </select>                              
                                                          </div>  
                                                          <div className="col-md-12">
                                                          <select
                                                              className="form-control input-design"
                                                              name="district_name"
                                                              required
                                                              value={formData.categoryId}
                                                              onChange={handleChange}
                                                              disabled={!formData.division_name}
                                                              >
                                                              <option value="" className='p-5'>জেলা</option>
                                                              {district.map((districtItem, index) => (
                                                                  <option key={index} value={districtItem.id} selected={districtItem.id === parseInt(formData.district_name)}> {/* Ensure to convert to string */}
                                                                  <div className='p-5'> {districtItem.title}</div>
                                                                  </option>
                                                              ))}
                                                          </select>                              
                                                          </div>   
                                                          <div className="col-md-12">
                                                              <input
                                                              type="text"
                                                              className="form-control input-design"
                                                              placeholder="ঠিকানা"
                                                              name="address"
                                                              value={formData.address}
                                                              onChange={handleChange}
                                                              required
                                                              />
                                                          </div>
                                                          <div className="col-md-12">
                                                              <input
                                                              type="text"
                                                              className="form-control input-design"
                                                              placeholder="ফোন *"
                                                              name="phone"
                                                              value={formData.phone}
                                                              onChange={handleChange}
                                                              required
                                                              />
                                                          </div>
                                                          <div className="col-md-12">
                                                            <input
                                                              type="text"
                                                              className="form-control input-design"
                                                              placeholder="ওয়েবসাইট https://www.example.com"
                                                              name="web_url"
                                                              value={formData.web_url}
                                                              onChange={handleChange}                                                              
                                                            />
                                                          </div>
                                                          <div  className={`px-5 form-check ${id ? 'd-none' : ''}`} >
                                                              <input type="checkbox" className="form-check-input" id="terms-and-condition" required/>
                                                              <label className="form-check-label" htmlFor="terms-and-condition">আমি <b>গ্রামীন ই-হাট</b> এর <Link to="/login" className="link-text">শর্তাবলী এবং নীতিমালা </Link> গুলো মনোযগ সহকারে পড়েছি এবং গ্রহণ করছি । </label>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className=' col-md-3'>
                                                  <div className="image-upload-area mb-4">
                                                    <div className="text-center">
                                                      {formData && formData.images &&
                                                        formData.images.split(',').map((image, index) => (
                                                          <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                                            <img 
                                                              src={`${config.FILE_URL}${image}`} 
                                                              alt={`Image Preview ${index + 1}`} 
                                                              style={{ maxWidth: '150px', maxHeight: '150px' }} 
                                                              loading="lazy"
                                                            />
                                                            <button 
                                                              type="button" 
                                                              className="btn btn-delete" 
                                                              style={{ position: 'absolute', top: '5px', right: '5px', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: '0.7' }}
                                                              onClick={() => handleDeleteImage(image)}
                                                            >
                                                              <i className="fa fa-times" aria-hidden="true"></i>
                                                            </button>
                                                          </div>
                                                        ))
                                                      }
                                                      <div className='form-group rounded-circle'>
                                                        <label htmlFor="images">ছবি</label>
                                                      </div>
                                                      <button type="button" className="btn mt-3 btn-theme" id='images-btn' data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                                        ছবি যুক্ত করুন
                                                      </button>
                                                    </div>
                                                  </div>

                                                  </div>
                                                      <div className="login-btn text-center text-sm-start py-4">
                                                          <button type="submit" className="btn btn-theme px-5 ">
                                                              বিজ্ঞাপন যুক্ত করুন
                                                          </button>
                                                      </div>
                                                  </div>
                                              </form>
                                            </>
                                        )
                                    }
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
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">ছবি যুক্ত করুন </h1>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                  </div>
                  <div className="modal-body">
                    {/* <FileUpload /> */}      
                    {/* <div
                      {...getRootProps()}
                      style={{
                        border: '2px dashed #FABB51',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        backgroundColor: isDragActive ? '#FABB51' : '#ffffff'
                      }}
                    >
                      <input {...getInputProps()} className='form-control' type='file' accept="image/jpeg, image/png, image/jpg, image/gif"/>
                      
                    </div>    */}
                    <label htmlFor="thumb"
                      style={{
                        border: '2px dashed #FABB51',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        backgroundColor: isDragActive ? '#FABB51' : '#ffffff',
                        width: '100%',

                      }}
                      onDragEnter={handleDragEnter}
                      onDragOver={(e) => e.preventDefault()}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {
                        isDragActive
                          ? <p>Drop the files here ...</p>
                          : <p>Click Here to Upload jpg/png/webp only</p> 
                      }
                    </label>
                    <input
                      type="file"
                      className="form-control input-design mt-3 d-none"
                      name="thumb"
                      id="thumb"
                      accept="image/jpeg, image/png, image/jpg, image/gif"
                      onChange={handleThumbChange}
                      required
                    />    
                    <div className='text-center mt-4'>
                      {formData && formData.thumb &&  <img src={`${config.FILE_URL}${formData.thumb}`} alt="Thumb Preview" style={{ maxWidth: '180px', maxHeight: '180px' }} />
                      }
                    </div>

                    {loadingimage === true &&  
                      <div className="page-image text-center p-2 mt-3">
                            {thumbPreview && <img src={thumbPreview} alt="Thumb Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
                        </div>
                    }
                   
                    {loadingimage === true &&  <span className='text-warning'>অপেক্ষা করুন ছবি যুক্ত হচ্ছে...</span> }
                    {loadingimage === true ? 
                      <div className="progress mt-3">
                          <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style={{ width: `${uploadProgress ?? 0}%` }} aria-valuenow={uploadProgress ?? 0} aria-valuemin={0} aria-valuemax={100}></div>
                      </div>
                    : null}
                  </div>

                  
                  <div className="modal-footer">
                    {formData && formData.thumb && <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal">Done</button> }
                    {/* <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal">Done</button> */}
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                  </div>
                </div>
              </div>
            </div>
            {/* modal area 2 */}
            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">ছবি যুক্ত করুন </h1>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                  </div>
                  <div className="modal-body">
                    {/* <FileUpload /> */}      
                    {/* <div
                      {...getRootProps()}
                      style={{
                        border: '2px dashed #FABB51',
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        backgroundColor: isDragActive ? '#FABB51' : '#ffffff'
                      }}
                    >
                      <input {...getInputProps()} className='form-control' type='file' accept="image/jpeg, image/png, image/jpg, image/gif" />
                    </div>    */}
                    <div className="form-group mt-3">
                      <label htmlFor="images"
                        style={{
                          border: '2px dashed #FABB51',
                          borderRadius: '4px',
                          padding: '20px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.3s ease',
                          backgroundColor: isDragActive ? '#FABB51' : '#ffffff',
                          width: '100%'
                        }}
                        onDragEnter={handleDragEnter}
                        onDragOver={(e) => e.preventDefault()}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >Click Here to Upload jpg/png/webp only</label>
                        <input
                        type="file"
                        className="form-control input-design btn btn-theme mt-3 d-none"
                        name="images"
                        id="images"
                        accept="image/jpeg, image/png, image/jpg, image/gif"
                        multiple
                        onChange={handleImageChange}
                        required
                        />
                    </div>
                    <div className='text-center mt-4'>
                    {formData && formData.images &&
                      formData.images.split(',').map((image, index) => (
                        <button onClick={() => changeimagetothumb(image)}  className={`m-3 ${image === formData.thumb ? 'button-active' : ''}`} key={index}>
                          <img 
                          key={index} 
                          src={`${config.FILE_URL}${image}`} 
                          alt={`Image Preview ${index + 1}`} 
                          style={{ maxWidth: '180px', maxHeight: '180px',  marginBottom: '10px', padding: '10px' }} 
                          loading="lazy"
                        />
                        </button>
                        
                      ))
                    }
                    </div>
                    <div className="page-image text-center p-2">
                        {imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt={`Image Preview ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px', padding: '10px' }} />
                        ))}
                    </div>
                    {imagesloaded === true &&  <div><span className='text-warning'>অপেক্ষা করুন ছবি যুক্ত হচ্ছে...</span></div> }
                    {imagesloaded === true ?
                      <div className="progress mt-3">
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-secondary" role="progressbar" style={{ width: `${uploadProgress ?? 0}%` }} aria-valuenow={uploadProgress ?? 0} aria-valuemin={0} aria-valuemax={100}></div>
                      </div>
                    : null}   
                  </div>
                  <div className="modal-footer">
                    {formData && formData.images !== '' && <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal">Done</button> }
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                  </div>
                </div>
              </div>
            </div>
        </div>       
    </div>  
  )
}