import React from 'react'
import { Link } from 'react-router-dom'

export default function Forget() {
  return (
    <div>
        <div className="login-page ">
          <div className="container col-md-3">
            <div className='login-form'>
                <p className="heading-text-center text-center">Forget Password</p>
                <div className="heading-border text-center"></div>
                <div className="reg-form">
                    <form className="row g-4">
                        <div className="col-md-12">
                          <input type="email" className="form-control input-design" placeholder="Email*"/>
                        </div>
                        <p className='m-0 my-2 mb-0'><Link to="/login" className='link-text'>Back to Login</Link></p>
                        <div className="login-btn text-center">
                        <Link to="/dashboard" type="submit" className="btn btn-theme px-5">Send Code</Link>
                        </div>
                        <p>Don't have an account | <Link to="/registration" className='link-text'>Create an account</Link></p>
                    </form>
                </div>
            </div>
              
          </div>
        </div>
    </div>
  )
}
