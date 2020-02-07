import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { start, stop, restart, setRaceOptions } from '../../actions'
import PropTypes from 'prop-types'
import Semaphore from '../../components/Semaphore'

const mapStateToProp = _state => {
  return {
    sessionTime: _state.sessionTime,
    raceStatus: _state.raceStatus,
    raceOptions: _state.raceOptions
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    start: () => _dispatch(start()),
    stop: () => _dispatch(stop()),
    restart: () => _dispatch(restart()),
    setRaceOptions: _options => _dispatch(setRaceOptions(_options))
  }
}

const sleep = _ms => {
  return new Promise(resolve => setTimeout(resolve, _ms))
}

class Controller extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      color1: 'white',
      color2: 'white',
      color3: 'white',
      showSemaphore: false
    }
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            {this.state.showSemaphore ? (
              <Semaphore
                color1={this.state.color1}
                color2={this.state.color2}
                color3={this.state.color3}
              />
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="text-center mt-3">
            <Button
              onClick={async () => {
                if (
                  this.props.sessionTime === 0 ||
                  this.props.raceStatus === 'stopped'
                ) {
                  this.props.setRaceOptions(
                    Object.assign({}, this.props.raceOptions, {
                      whenStarted: new Date().getTime()
                    })
                  )
                }

                if (this.props.raceOptions.type === 'Race') {
                  this.setState({
                    showSemaphore: true
                  })

                  await sleep(1000)
                  this.setState({ color1: 'red' })
                  await sleep(1000)
                  this.setState({ color2: 'red' })
                  await sleep(1000)
                  this.setState({ color3: 'red' })
                  await sleep(1000)
                  this.setState({
                    color1: 'green',
                    color2: 'green',
                    color3: 'green'
                  })
                  await sleep(100)

                  this.setState({
                    showSemaphore: false
                  })

                  this.setState({
                    color1: 'white',
                    color2: 'white',
                    color3: 'white'
                  })
                }

                this.props.start()
              }}
              disabled={this.props.raceStatus === 'running'}
              className="full-width h-70 font-weight-bold text-md text-white"
              color="success"
            >
              Start
            </Button>
          </Col>
          <Col xs={4} className="text-center mt-3">
            <Button
              onClick={() => this.props.stop()}
              disabled={this.props.raceStatus === 'stopped'}
              className="full-width h-70 font-weight-bold text-md text-white"
              color="danger"
            >
              Stop
            </Button>
          </Col>
          <Col xs={4} className="text-center mt-3">
            <Button
              onClick={() => this.props.restart()}
              disabled={this.props.raceStatus === 'running'}
              className="full-width h-70 font-weight-bold text-md text-white"
              color="warning"
            >
              Restart
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

Controller.propTypes = {
  sessionTime: PropTypes.number,
  raceStatus: PropTypes.string,
  raceOptions: PropTypes.object,
  start: PropTypes.func,
  stop: PropTypes.func,
  restart: PropTypes.func
}

export default connect(mapStateToProp, mapDispatchToProps)(Controller)
