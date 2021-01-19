// This is the login in page for the app 
import React, {useState} from 'react';

function SignIn(props) {
  return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                    />
                </div>

                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button 
                    type="submit" 
                    className="btn btn-primary">
                    Sign In
                </button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;