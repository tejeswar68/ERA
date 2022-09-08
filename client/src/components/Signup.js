import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Col ,Row} from 'react-bootstrap';



function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onFormSubmit = (userObj) => {

        console.log(userObj);
        const sendRequest = async () => {
            const res = await axios.post("http://localhost:5005/api/user/signup", {
                name: userObj.name,
                email: userObj.email,
                password: userObj.password
            }).catch(errors => console.log(errors));
            const data = await res.data;
            console.log(data);
            return data;

        }
        sendRequest()
            .then(() => navigate('/login'));



    }

    return (
        
        <div id="reg">
            <div className='container'>
                <div className='row'>
                    <div className="col-11 col-sm-8 col-md-5 mx-auto mt-5 mb-4">
                        <form className='border p-4 border-warning bg-opacity-50 shadow rounded-3' onSubmit={handleSubmit(onFormSubmit)} style={{ color: 'orange' }}>
                            <div className='mb-3'>
                                <p className='display-6 text-center'>ENROLL THE ERAVERSE!</p>
                            </div>
                            <hr />
                            {/* username */}
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" style={{ borderRadius: '15px' }} id="name" className="form-control" {...register("name", { required: true, minLength: 4, maxLength: 16 })} />
                                {/* validation error msg for username */}
                                {errors.name?.type === 'required' && <p className='text-danger'>* Username required</p>}
                                {errors.name?.type === 'minLength' && <p className='text-danger'>* Min length should be 4</p>}
                                {errors.name?.type === 'maxLength' && <p className='text-danger'>* Max length should be 16</p>}
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
                                    <label htmlFor="t&c" className="form-check-label">I accept all the <a href="#">Terms and conditions</a></label>
                                    {
                                        errors.tc?.type === 'required' && <p className='text-danger'>* You Should Accept T & C</p>
                                    }
                                </div>
                            </div>
                            {/* submit button */}
                            <div className='mb-0 text-center'>
                                <button type="submit" style={{ borderRadius: '15px', backgroundColor: 'orange', color: 'black' }} className="btn  w-50 mb-1">Register</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;