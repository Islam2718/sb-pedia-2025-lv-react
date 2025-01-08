import React from 'react'
import Sidebar from '../UserPage/Siderbar';

export default function Message() {   
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
                        <p className='search-reasult mt-3'>
                            <span className='fw-bold h5'> <i className="fa-solid fa-message"></i> মেসেজ সমূহ </span>
                        </p>
                        <div className="message-area mt-2 p-3">
                            <div className="row">
                                <div className="col-md-4 col-sm-6">
                                   <h5 className="fw-bold">User</h5>
                                   <hr className="dropdown-divider w-100"></hr>
                                    <div className="inbox_chat_wrapper">
                                        <div className="single_chat chat_online d-flex align-items-center active">
                                            <div className="chat_author">
                                              <img src="/images/user.png" alt="author"/>
                                            </div>
                                            <div className="chat_content media-body ms-2">
                                                <h6 className="name mb-0">মোঃ মেহেদী হোসাইন</h6>
                                                <span className="sub_title mb-0">Online</span>
                                            </div>
                                        </div>
                                        <div className="single_chat chat_online d-flex align-items-center active">
                                            <div className="chat_author">
                                              <img src="/images/user.png" alt="author"/>
                                            </div>
                                            <div className="chat_content media-body ms-2">
                                                <h6 className="name mb-0">রুপন্তি</h6>
                                                <span className="sub_title mb-0">Online</span>
                                            </div>
                                        </div>
                                        <div className="single_chat chat_online d-flex align-items-center active">
                                            <div className="chat_author">
                                              <img src="/images/user.png" alt="author"/>
                                            </div>
                                            <div className="chat_content media-body ms-2">
                                                <h6 className="name mb-0">কৃষিখামাড়</h6>
                                                <span className="sub_title mb-0">Online</span>
                                            </div>
                                        </div>
                                        <div className="single_chat chat_online d-flex align-items-center active">
                                            <div className="chat_author">
                                              <img src="/images/user.png" alt="author"/>
                                            </div>
                                            <div className="chat_content media-body ms-2">
                                                <h6 className="name mb-0">মোঃ আবির হোসাইন</h6>
                                                <span className="sub_title mb-0">Online</span>
                                            </div>
                                        </div>
                                        <div className="single_chat chat_online d-flex align-items-center active">
                                            <div className="chat_author">
                                              <img src="/images/user.png" alt="author"/>
                                            </div>
                                            <div className="chat_content media-body ms-2">
                                                <h6 className="name mb-0">রুপন্তি</h6>
                                                <span className="sub_title mb-0">Online</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 col-sm-6">
                                    <h5 className="fw-bold">Chat Message</h5>
                                    <hr className="dropdown-divider w-100"></hr>
                                        <div className="inbox_massage_wrapper">
                                            <div className="incoming_msg d-flex align-items-center my-3 ">
                                                <div className="incoming_msg_img">
                                                    <img src="/images/user.png" alt="author"/>
                                                </div>
                                                <div className="incoming_msg_content media-body">
                                                    <p className="m-0">Test which is a new approach to have all solutions</p>
                                                    <span>11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                            
                                            <div className="outgoing_msg clearfix">
                                                <div className="outgoing_msg_content text-end">
                                                    <p className="m-0">Test which is a new approach to have all solutions</p>
                                                    <span>11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                            <div className="incoming_msg d-flex align-items-center my-3">
                                                <div className="incoming_msg_img">
                                                    <img src="/images/user.png" alt="author"/>
                                                </div>
                                                <div className="incoming_msg_content media-body">
                                                    <p className="m-0">Test which is a new approach to have all solutions</p>
                                                    <span>11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                            
                                            <div className="outgoing_msg clearfix">
                                                <div className="outgoing_msg_content text-end">
                                                    <p className="m-0">Test which is a new approach to have all solutions</p>
                                                    <span>11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                            <div className="incoming_msg d-flex align-items-center my-3">
                                                <div className="incoming_msg_img">
                                                    <img src="/images/user.png" alt="author"/>
                                                </div>
                                                <div className="incoming_msg_content media-body">
                                                    <p className="m-0">Test which is a new approach to have all solutions</p>
                                                    <span>11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                            
                                            <div className="outgoing_msg clearfix">
                                                <div className="outgoing_msg_content text-end">
                                                    <p className="m-0">Test which is a new approach to have all solutions</p>
                                                    <span>11:01 AM | June 9</span>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="massage_type ">
                                        <textarea placeholder="এখানে টাইপ করুন এবং এন্টার টিপুন"></textarea>
                                        <button><i className="fa-solid fa-paper-plane"></i></button>
                                    </div>
                                </div>
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
