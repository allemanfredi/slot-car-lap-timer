import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Time from './time/Time'
import Controller from './controller/Controller'
import Previous from './previous/Previous'
import Podium from './podium/Podium'
import Laps from './laps/Laps'
import Names from './names/Names'
import Menu from './menu/Menu'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = _state => {
  return {
    raceOptions: _state.raceOptions
  }
}

const App = props => {
  return (
    <Container>
      <Row>
        <Col xs={12} className="mt-3">
          <Menu />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mt-3">
          <Names />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Controller />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={12} lg={6} className="text-center mt-3">
              <Time />
            </Col>
            {props.raceOptions.type === 'Race' ? (
              <Col xs={12} lg={6} className="mt-3">
                <Podium />
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={8}>
          <Row>
            <Col xs={12} className="text-center mt-4  mb-4">
              <Previous />
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={4} className="text-center mt-4 mb-4">
          <Laps />
        </Col>
      </Row>
    </Container>
  )
}

App.propTypes = {
  raceOptions: PropTypes.object
}

export default connect(mapStateToProps)(App)
