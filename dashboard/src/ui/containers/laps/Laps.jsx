import React from 'react'
import { Row, Col, Card, Table } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = _state => {
  return {
    l1Laps: _state.l1Laps,
    l2Laps: _state.l2Laps,
    l3Laps: _state.l3Laps,
    l4Laps: _state.l4Laps
  }
}

const Laps = props => {
  return (
    <Card body className="shadow bg-white rounded no-border-color">
      <Row>
        <Col xs={12} className="font-weight-bold text-left mb-3">
          Laps
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>L1</th>
            <th>L2</th>
            <th>L3</th>
            <th>L4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.l1Laps.length}</td>
            <td>{props.l2Laps.length}</td>
            <td>{props.l3Laps.length}</td>
            <td>{props.l4Laps.length}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

Laps.propTypes = {
  l1Laps: PropTypes.array,
  l2Laps: PropTypes.array,
  l3Laps: PropTypes.array,
  l4Laps: PropTypes.array
}

export default connect(mapStateToProps, null)(Laps)
