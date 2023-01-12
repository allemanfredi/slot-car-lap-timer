import React from 'react'
import { Row, Col, Modal, ModalBody } from 'reactstrap'

const Semaphore = (props) => {
  return (
    <Modal isOpen={true}>
      <ModalBody>
        <Row>
          <Col xs={4} className="text-center">
            <div className={`semaphore-${props.color1}`} />
          </Col>
          <Col xs={4} className="text-center">
            <div className={`semaphore-${props.color2}`} />
          </Col>
          <Col xs={4} className="text-center">
            <div className={`semaphore-${props.color3}`} />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default Semaphore
