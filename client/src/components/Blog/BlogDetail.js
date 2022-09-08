import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function BlogDetail() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const id = useParams().id;
  const [blog, setBlog] = useState();
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5005/api/blog/${id}`)
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then((data) => setBlog(data.blog))
  }, [id]);


  const onFormSubmit = (blogdetail) => {

    const sendRequest = async () => {
      const res = await axios.put(`http://localhost:5005/api/blog/update/${id}`,
        {
          title: blogdetail.title,
          description: blogdetail.description
        }).catch(err => console.log(err));
      const data = await res.data;
      return data;
    }
    sendRequest()
      .then(() => navigate("/myblogs/"));
  }
  return (
    <div><div className='row'>
      <div className="col-11 col-sm-8 col-md-5 mx-auto mt-5 mb-4">
        <form className='border p-4 bg-transaparent border-warning bg-opacity-50 shadow rounded-3' onSubmit={handleSubmit(onFormSubmit)} style={{ color: 'orange' }}>
          <div className='mb-3'>
            <p className='display-6 text-center'>UPDATE BLOG</p>
            <hr />
          </div>

          {/* username */}
          <div className="mb-3">
            <label htmlFor="title" >Title</label>
            <input type="text" style={{ borderRadius: '15px' }} id="title" className="form-control" {...register("title", { required: true })} />

            {errors.name?.type === 'required' && <p className='text-danger'>* Username required</p>}

          </div>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <input type="text" style={{ borderRadius: '15px' }} id="description" className="form-control" {...register("description", { required: true })} />

            {errors.email?.type === 'required' && <p className='text-danger'>*Description required</p>}
          </div>



          {/* submit button */}
          <div className='mb-0 text-center'>
            <button type="submit" style={{ borderRadius: '15px', backgroundColor: 'orange', color: 'black' }} className="btn w-50 mb-1">UPDATE</button>
          </div>
        </form>
      </div>
    </div></div>
  )
}

export default BlogDetail