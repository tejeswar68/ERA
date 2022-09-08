import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
// import '../CSS/AddBlogs.css'

function AddBlog() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const onFormSubmit = (blogdetail) => {
    console.log(blogdetail);
    const sendRequest = async () => {
      const res = await axios.post("http://localhost:5005/api/blog/add",
        {
          title: blogdetail.title,
          description: blogdetail.description,
          image: blogdetail.image,
          user: localStorage.getItem("userId")
        }).catch(err => console.log(err))
      const data = res.data;
      return data;
    }
    sendRequest().then(() => navigate('/myblogs'));
  }
  return (
    <div id="reg" className='addblog m-5'>
      <div className='container'>
        <div className='row'>
          <div className="col-11 col-sm-8 col-md-5 mx-auto mt-5 mb-4" >
            <form className='border p-4 bg-transparent border-warning bg-opacity-50 shadow rounded-3' onSubmit={handleSubmit(onFormSubmit)} style={{ backgroundColor: '#656565', color: 'orange', borderColor: 'orange' }}>
              <div className='mb-3'>
                <p className='display-6 text-center'>ADD BLOG</p>
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
                <textarea type="text" style={{ borderRadius: '15px' }} id="description" className="form-control" {...register("description", { required: true })} />

                {errors.email?.type === 'required' && <p className='text-danger'>*Description required</p>}
              </div>

              {/* Image URL */}
              <div className="mb-3">
                <label htmlFor="image">Image URL</label>
                <input type="text" style={{ borderRadius: '15px' }} id="image" className="form-control" {...register("image", { required: true })} />

                {errors.password?.type === 'required' && <p className='text-danger'>*Image URL required</p>}
              </div>

              {/* submit button */}
              <div className='mb-0 text-center'>
                <button type="submit" style={{ borderRadius: '15px', backgroundColor: '#f48915', color: 'white' }} className="btn w-50 mb-1">ADD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AddBlog