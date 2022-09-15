import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import addblogimg from "../images/addblog.png";
import { Row, Col } from 'react-bootstrap';
import useButtonLoader from '../useButtonLoader';
// import '../CSS/AddBlogs.css'

function AddBlog() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[addBlogButton,setButtonLoading] = useButtonLoader(
    "ADD",
    "ADDING..."
  );
 
  

  const navigate = useNavigate();
  const onFormSubmit = (blogdetail) => {
    console.log(blogdetail);
    const sendRequest = async () => {
      setButtonLoading(true);
      const res = await axios.post("https://era6.herokuapp.com/api/blog/add",
        {
          title: blogdetail.title,
          description: blogdetail.description,
          image: blogdetail.image,
          user: localStorage.getItem("userId")
        }).catch(err => console.log(err))
      const data = res.data;
      return data;
    }
    sendRequest()
      .then(()=>setButtonLoading(false))
      .then(() => navigate('/myblogs'));
  }
  return (
    <div id="reg" className='addblog m-5'>
      <div className='container'>
        <div className='row'>
          <div className="col-sm-12 col-md-10 mx-auto mt-5 mb-4" >
            <form className='p-4 bg-transparent bg-opacity-50 shadow rounded-3' onSubmit={handleSubmit(onFormSubmit)} style={{ backgroundColor: '#8e29ae', color: '#7e37db', border:'3px solid #7e37db'}}>
              <Row>
                <Col xs={12} md={6}><img src={addblogimg} alt="" className='w-100' /></Col>
                
                <Col xs={12} md={6}>
                  <div className='m-3'>
                    <p className='display-6 text-center m-3'>ADD BLOG</p>
                    <hr  />
                  </div>

                  {/* username */}
                  <div className="m-3">
                    <label htmlFor="title" >Title</label>
                    <input type="text" style={{ borderRadius: '15px' }} id="title" className="form-control" {...register("title", { required: true })} />

                    {errors.title?.type === 'required' && <p className='text-danger'>*Title required</p>}

                  </div>
                  {/* email */}
                  <div className="m-4">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" style={{ borderRadius: '15px' }} id="description" className="form-control" {...register("description", { required: true })} />

                    {errors.description?.type === 'required' && <p className='text-danger'>*Description required</p>}
                  </div>

                  {/* Image URL */}
                  <div className="m-3">
                    <label htmlFor="image">Image URL</label>
                    <input type="text" style={{ borderRadius: '15px' }} id="image" className="form-control" {...register("image", { required: true })} />

                    {errors.image?.type === 'required' && <p className='text-danger'>*Image URL required</p>}
                  </div>

                  {/* submit button */}
                  <div className='mb-0 text-center'>
                    <button type="submit" ref={addBlogButton} style={{ borderRadius: '15px', color: '#7e37db',border:'1px solid #7e37db'  }} className="btn w-50 m-3"/>
                  </div></Col>
              </Row>


            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddBlog