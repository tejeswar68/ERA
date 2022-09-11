import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';
import {Row,Col,Button} from 'react-bootstrap'
import loginpic from './images/3d1.png'
// import Particles from 'react-particles-js';

function Login() {
    const dispath = useDispatch();
    const[check,setCheck] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();


    const onFormSubmit = (userCredObj) => {
        const sendRequest = async () => {
            const res = await axios.post("http://localhost:5005/api/user/login", {
                email: userCredObj.email,
                password: userCredObj.password
            }).catch(errors => setCheck(true));

            const data = await res.data;
            return data;

        }
        sendRequest()
            .then((data) => localStorage.setItem("userId", data.user._id))
            .then(() => dispath(authActions.login()))
            .then(() => navigate("/blogs"))
            .then(()=>setCheck(false))

    }


    return (
       
            <div id="re" >
            <div className='container-fluid '>
                
                <div className='row '>
                    <div className="col-md-10 col-sm-12 mx-auto mt-5 mb-4"  >
                        <form className='border border-info p-4  bg-opacity-50 shadow rounded-3' style={{color:'skyblue'}} onSubmit={handleSubmit(onFormSubmit)} >
                        <Row>
                        <Col xs={12} md={6}><img src={loginpic} alt="" className='w-100' /></Col>
                        <Col xs={12} md={6}>
                        <div className='m-5'>
                                <p className='display-6 text-center'>EXPERIENCE THE ERAVERSE!</p>
                            </div>
                            <hr />
                            {/* email */}
                            <div className="mb-3">
                                <label htmlFor="email" className='text-center mt-3 mb-1'>Email</label>
                                <input type="email" style={{ borderRadius: '15px' }} id="email" className="form-control  " {...register("email", { required: true })} />
                                {/* validation error msg for email */}
                                {errors.email?.type === 'required' && <p className='text-danger'>* Email required</p>}
                            </div>
                            {/* password */}
                            <div className="mb-3">
                                <label htmlFor="password" className='mt-3 mb-1 d-block m-auto'>Password</label>
                                <input type="password" style={{ borderRadius: '15px' }} id="password" className="form-control" {...register("password", { required: true, maxLength: 28, minLength: 8 })} />
                                {/* validation error msg for password */}
                                {check && <p className='text-danger'>*Invalid User Credentials</p>}
                                {errors.password?.type === 'required' && <p className='text-danger'>*Password required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-danger'>*Min length should be 8</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-danger'>*Max length should be 28</p>}
                            </div>
                            {/* login button */}
                            <div className='mb-1 text-center'>
                                {/* <button type="submit" className="btn  w-50 mb-1" style={{ borderRadius: '15px', backgroundColor: 'orange', color: '' }}>Login</button> */}
                                <Button type='submit' variant='outline-info' size="lg">Login</Button>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-6 text-end mt-2'>
                                    <p>New User? </p>
                                </div>
                                <div className='col-6 text-start'>
                                    {/* <Button href="signup" className='  border-warning border' style={{ borderRadius: '15px', color: 'black' ,backgroundColor:'yellow'}}>SIGNUP</Button> */}
                                    <Button href="signup" variant='outline-info'>Signup</Button>
                                </div>

                            </div>
                        </Col>
                        </Row>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
    )
}

export default Login;