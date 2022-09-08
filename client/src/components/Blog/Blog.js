import React from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap'

function Blog({ title, description, image, userName, isUser, id, flag, reloadStories }) {

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myblogs/${id}`)
  }
  const deleteRequest = async (id) => {
    const res = await axios.delete(`http://localhost:5005/api/blog/${id}`).catch(err => console.log(err));
    const data = res.data;

    return data;

  }
  const handleDelete = (id) => {
    deleteRequest(id)
      .then(() => reloadStories(!flag));
  }
  return (
    <Row>
      <Col xs={12} md={6}  className='m-auto'>
      <div  >
      <div >
      <Card style={{ margin: "auto",color:'orange',boxShadow:'5px 5px 20px orange' }} className='mt-5 mb-5 border bg-opacity-10 border-warning bg-transparent ' >
        <Card.Header className='bg-transparent border-warning '>
          <div className="row">
            <div className="col-10">{userName}</div>
            <div className="col-1">{isUser && <FontAwesomeIcon onClick={handleEdit} icon={faPenToSquare} />}</div>
            <div className="col-1">{isUser && <FontAwesomeIcon onClick={() => handleDelete(id)} icon={faTrash} />}</div>
          </div>
        </Card.Header >
        <Card.Img src={image} className="m-auto mt-3 mb-3 w-75" />
        <hr />
        <Card.Body style={{color:'orange'}} >
          <Card.Title className='text-center'>{title}</Card.Title>
          <hr style={{ width: "60%", margin: "auto", color: '#f48915', height: "10px" }} />
          <Card.Text className='text-center mt-3'>
            {description}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </div>
      </Col>
    </Row>

   

  )
}

export default Blog