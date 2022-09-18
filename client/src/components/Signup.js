import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Col ,Row} from 'react-bootstrap';
import Signuppic from './images/signup.png';
import useButtonLoader from './useButtonLoader';


function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const[signupButtonn,setLoading] = useButtonLoader("Signup","Processing...")


    const onFormSubmit = (userObj) => {
        const sendRequest = async () => {
            setLoading(true);
            const res = await axios.post("https://era68.herokuapp.com/api/user/signup", {
                name: userObj.name,
                email: userObj.email,
                password: userObj.password
            }).catch(errors => console.log(errors));
             // eslint-disable-next-line
             const data = res.data;
            
        }
        sendRequest()
            .then(()=>setLoading(false))
            .then(() => navigate('/login'));

    }

    return (
        
        <div id="reg">
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-12 col-md-10 mx-auto mt-5 mb-4">
                        <form className='p-4 bg-opacity-50 shadow rounded-3' onSubmit={handleSubmit(onFormSubmit)} style={{ color: '#c9e74e',border:'3px solid #c9e74e' }}>
                            <Row>
                                <Col md={6} xs={12}> <img src={Signuppic} className='w-100' alt="" /></Col>
                              
                                <Col  md={6} xs={12}>
                                <div className='mb-3'>
                                <p className='display-6 text-center m-4'>ENROLL THE ERAVERSE!</p>
                            </div>
                            <hr />
                            {/* username */}
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" style={{ borderRadius: '15px' }} id="name" className="form-control" {...register("name", { required: true, minLength: 4, maxLength: 26 })} />
                                {/* validation error msg for username */}
                                {errors.name?.type === 'required' && <p className='text-danger'>* Username required</p>}
                                {errors.name?.type === 'minLength' && <p className='text-danger'>* Min length should be 4</p>}
                                {errors.name?.type === 'maxLength' && <p className='text-danger'>* Max length should be 26</p>}
                            </div>
                            {/* email */}
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input type="email" style={{ borderRadius: '15px' }} id="email" className="form-control" {...register("email", { required: true })} />
                                {/* validation error msg for email */}
                                {errors.email?.type === 'required' && <p className='text-danger'>* Email required</p>}
                            </div>

                            {/* password */}
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" style={{ borderRadius: '15px' }} id="password" className="form-control" {...register("password", { required: true, minLength: 8, maxLength: 16 })} />
                                {/* validation error msg for password */}
                                {errors.password?.type === 'required' && <p className='text-danger'>* Password required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-danger'>* Min length should be 8</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-danger'>* Max length should be 16</p>}
                            </div>
                            {/* terms and conditions */}
                            <div className="mb-4">
                                <div className="form-check">
                                    <input type="checkbox" id="t&c" className="form-check-input" {...register("tc", { required: true })} value="t&c" />
                                    <label htmlFor="t&c" className="form-check-label">I accept all the <a href="/">Terms and conditions</a></label>
                                    {
                                        errors.tc?.type === 'required' && <p className='text-danger'>* You Should Accept T & C</p>
                                    }
                                </div>
                            </div>
                            {/* submit button */}
                            <div className='mb-0 text-center'>
                                <button type="submit" ref={signupButtonn} style={{ borderRadius: '15px', color: '#c9e74e',border:'1px solid #c9e74e '}}  className="btn  w-50 mb-1"/>
                                  
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

export default SignUp;