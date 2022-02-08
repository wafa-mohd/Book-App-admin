import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom"

function Login() {

    let history = useHistory()

    const [errorMsg, seterrorMsg] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(e.target.email.value);
        axios.post(process.env.REACT_APP_API + 'admin/login', {
            email: e.target.email.value,
            password: e.target.password.value
        }).then(res => {
            console.log('ressss ',res);
            localStorage.setItem('auth',res.data.token)
            history.push("/")
        }).catch(err => {
            console.log("errrr ",err);
            seterrorMsg(err.response.data.message)
        })
    }

    return (
        <div>
           <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleLogin}>
                          {errorMsg && <div className="alert alert-danger" role="alert">
                            {errorMsg}
                        </div>}
                        
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" name="email" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user" name="password" id="exampleInputPassword" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Login
                        </button>                       
                      </form>
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

export default Login
