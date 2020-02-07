import React from 'react'
import { Row, Col, Card, CardTitle } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toHHMMSS, toSSMM } from '../../utils'

const mapStateToProps = _state => {
  return {
    sessionTime: _state.sessionTime,
    l1LapTime: _state.l1LapTime,
    l2LapTime: _state.l2LapTime,
    l3LapTime: _state.l3LapTime,
    l4LapTime: _state.l4LapTime,
    names: _state.names,
    raceOptions: _state.raceOptions
  }
}

const Time = props => {
  return (
    <Card body className="shadow bg-white rounded height-max">
      <Row>
        <Col xs={6} className="my-auto font-weight-bold text-left mb-3">
          {props.raceOptions.type === 'Free Practise'
            ? 'Session time'
            : 'Remaining time'}
        </Col>
        <Col xs={6} className="text-right text-md">
          {toHHMMSS(props.sessionTime)}
        </Col>
      </Row>
      <hr />
      <CardTitle className="text-sm mb-3 font-weight-bold">
        Current Lap
      </CardTitle>
      <Row>
        <Col xs={3} className="font-weight-bold text-center">
          {'L1' +
            (props.names.l1 && props.sessionTime ? `(${props.names.l1})` : '')}
        </Col>
        <Col xs={3} className="font-weight-bold">
          {'L2' +
            (props.names.l2 && props.sessionTime ? `(${props.names.l2})` : '')}
        </Col>
        <Col xs={3} className="font-weight-bold">
          {'L3' +
            (props.names.l3 && props.sessionTime ? `(${props.names.l3})` : '')}
        </Col>
        <Col xs={3} className="font-weight-bold">
          {'L4' +
            (props.names.l4 && props.sessionTime ? `(${props.names.l4})` : '')}
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="text-md">
          {toSSMM(props.l1LapTime)}
        </Col>
        <Col xs={3} className="text-md">
          {toSSMM(props.l2LapTime)}
        </Col>
        <Col xs={3} className="text-md">
          {toSSMM(props.l3LapTime)}
        </Col>
        <Col xs={3} className="text-md">
          {toSSMM(props.l4LapTime)}
        </Col>
      </Row>
    </Card>
  )
}

Time.propTypes = {
  sessionTime: PropTypes.number,
  l1LapTime: PropTypes.number,
  l2LapTime: PropTypes.number,
  l3LapTime: PropTypes.number,
  l4LapTime: PropTypes.number,
  names: PropTypes.object,
  raceOptions: PropTypes.object
}

export default connect(mapStateToProps, null)(Time)
