import React from 'react'
import { Row, Col, Modal, ModalBody } from 'reactstrap'
import QRCode from 'react-qr-code'

const QrCode = (_props) => {
  return (
    <Modal isOpen={_props.show} toggle={_props.toggle}>
      <ModalBody>
        <Row>
          <Col xs={12} className="text-center">
            <QRCode value="http://slot-private.s3-website.eu-central-1.amazonaws.com/" />
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default QrCode
