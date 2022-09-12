import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import updateblogimg from "../images/updateblogs.png";
import { Col, Row } from 'react-bootstrap';
import useButtonLoader from '../useButtonLoader';

function BlogDetail() {
  

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const[updateButton,setLoading] = useButtonLoader("UPDATE","UPDATING...")
  const id = useParams().id;
  // eslint-disable-next-line
  const [blog, setBlog] = useState();
  const fetchDetails = async () => {
   
    const res = await axios.get(`https://era68.herokuapp.com/api/blog/${id}`)
      .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    fetchDetails().then((data) => setBlog(data.blog)) // eslint-disable-next-line
  }, [id]);
  // console.log(blog);


  const onFormSubmit = (blogdetail) => {

    const sendRequest = async () => {
      setLoading(true);
      const res = await axios.put(`https://era68.herokuapp.com/api/blog/update/${id}`,
        {
          title: blogdetail.title,
          description: blogdetail.description
        }).catch(err => console.log(err));
      const data = await res.data;
      return data;
    }
    sendRequest()
      .then(()=> setLoading(false))
      .then(() => navigate("/myblogs/"));
  }
  return (
    <div><div className='row'>
      <div className=" col-sm-8 col-md-6 mx-auto mt-5 mb-4">
        <form className='p-4 bg-transaparent bg-opacity-50 shadow rounded-3' onSubmit={handleSubmit(onFormSubmit)} style={{ color: '#078e71' ,border:"3px solid #078e71"}} >
          <Row>
            <Col xs={12} md={6}> <img src={updateblogimg} alt="" className='w-100 h-100 mb-3' /> </Col>
            <Col> <div className='mb-3'>
            <p className='display-6 text-center'>UPDATE BLOG</p>
            <hr />
          </div>

          {/* username */}
          <div className="m-3">
            <label htmlFor="title" >Title</label>
            <input type="text" style={{ borderRadius: '15px' }} id="title" className="form-control" {...register("title", { required: true })} />

            {errors.title?.type === 'required' && <p className='text-danger'>* Username required</p>}

          </div>
          {/* email */}
          <div className="m-3">
            <label htmlFor="description">Description</label>
            <textarea type="text" style={{ borderRadius: '15px' }} id="description" className="form-control" {...register("description", { required: true })} />

            {errors.description?.type === 'required' && <p className='text-danger'>*Description required</p>}
          </div>



          {/* submit button */}
          <div className='mb-0 text-center'>
            <button type="submit" ref={updateButton} style={{ borderRadius: '15px', color: '#078e71',border:'1px solid #078e71'  }} className="btn w-50 m-4"/>
          </div></Col>
          </Row>
         
        </form>
      </div>
    </div></div>
  )
}

export default BlogDetail