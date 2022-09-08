import React from 'react'
import TEJADP from '../images/TEJADP.jpg'
import '../CSS/Creator.css'
import { Row ,Col} from 'react-bootstrap'
function Creator() {
  return (
    <div >
   
     <Row>
        <Col xs={12} md={6}  className='left-t '>
        <span >CREATOR</span>
       <span className='stroke-text text-center'>TEJESWARA MURTHY PALWADI</span>
       <span className='text-center'>VNRVJIET</span>
       </Col>
       <Col xs={12} md={6}  >
        <div ></div>
        <img src={TEJADP} alt="" className='w-25 m-auto d-block mt-2 mb-2 creatorimg ' />
       </Col>
     </Row>
    </div>
  )
}

export default Creator