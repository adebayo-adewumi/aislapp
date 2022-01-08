import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Colors from '../../common/Colors';
import AuthScreenCanvas from '../../components/AuthScreenCanvas';
import { TFormData } from '../../components/Form';
import FormHoc from '../../components/FormHoc';
import './index.scss';

const Login = () => {

    const schema: TFormData = useMemo(() => {
        return [
            {
              id: "username",
              type: "input",
              inputs: {
                  type: "text",
                  required: true,
                  placeholder: "Email or Phone number",
                  label: "UserName"
              }
            },{
              id: "password",
              type: "input",
              inputs: {
                  type: "password",
                  placeholder: "Password",
                  label: "Password"
              }
            }, 
        ] as TFormData;
    }, []);

    return (
        <div className="auth-login">
        
            <AuthScreenCanvas />
            <div className="auth-login-form-wrapper">
                <div className="auth-login-form">
                    <h1>Hello Again!</h1>
                    <h4>Welcome Back</h4>
                    <FormHoc buttonLabel='Sign In' data={schema} /> 
                    <div className="text-center log-account-link">
                        Don't have an account? <Link to="" style={{color: Colors.secColor}}>Register</Link>
                        <br />
                        <br />
                        <Link to="" style={{color: Colors.secColor}}>
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;