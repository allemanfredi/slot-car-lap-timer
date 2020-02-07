import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = _state => {
  return {
    l1Laps: _state.l1Laps,
    l2Laps: _state.l2Laps,
    l3Laps: _state.l3Laps,
    l4Laps: _state.l4Laps,
    names: _state.names
  }
}

class Previous extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      l1best: 0,
      l2best: 0,
      l3best: 0,
      l4best: 0,
      l1Laps: [],
      l2Laps: [],
      l3Laps: [],
      l4Laps: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.l1Laps.length === 0) {
      return {
        l1best: 0,
        l1Laps: [],
        l2best: 0,
        l2Laps: [],
        l3best: 0,
        l3Laps: [],
        l4best: 0,
        l4Laps: []
      }
    }

    if (nextProps.l1Laps.length !== prevState.l1Laps.length) {
      return {
        l1best: Math.min(...nextProps.l1Laps.map(l => l.time)),
        l1Laps: nextProps.l1Laps
      }
    }

    if (nextProps.l2Laps.length !== prevState.l2Laps.length) {
      return {
        l2best: Math.min(...nextProps.l2Laps.map(l => l.time)),
        l2Laps: nextProps.l2Laps
      }
    }

    if (nextProps.l3Laps.length !== prevState.l3Laps.length) {
      return {
        l3best: Math.min(...nextProps.l3Laps.map(l => l.time)),
        l3Laps: nextProps.l3Laps
      }
    }

    if (nextProps.l4Laps.length !== prevState.l4Laps.length) {
      return {
        l4best: Math.min(...nextProps.l4Laps.map(l => l.time)),
        l4Laps: nextProps.l4Laps
      }
    }
    return null
  }

  render() {
    return (
      <div className="shadow bg-white rounded container">
        <Row>
          <Col xs={12} className="font-weight-bold mt-3 text-left">
            Live Results
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={3} className="font-weight-bold text-center mt-3">
            {'L1' +
              (this.props.names.l1 && this.props.sessionTime
                ? `(${this.props.names.l1})`
                : '')}
          </Col>
          <Col xs={3} className="font-weight-bold mt-3">
            {'L2' +
              (this.props.names.l2 && this.props.sessionTime
                ? `(${this.props.names.l2})`
                : '')}
          </Col>
          <Col xs={3} className="font-weight-bold mt-3">
            {'L3' +
              (this.props.names.l3 && this.props.sessionTime
                ? `(${this.props.names.l3})`
                : '')}
          </Col>
          <Col xs={3} className="font-weight-bold mt-3">
            {'L4' +
              (this.props.names.l4 && this.props.sessionTime
                ? `(${this.props.names.l4})`
                : '')}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={3}>
            <Row>
              {[this.state.l1best, ...this.props.l1Laps.map(l => l.time)]
                .filter((l1lap, index) => index < 7 && l1lap !== 0)
                .map((l1lap, index) => {
                  return (
                    <Col
                      key={l1lap.toString() + index.toString()}
                      xs={12}
                      className={
                        (index === 0 ? 'font-weight-bold text-sm' : '') +
                        (index === 1 ? 'text-sm' : '') +
                        (index > 1 ? 'text-sm' : '') +
                        ' mt-2 mb-2'
                      }
                    >
                      {l1lap / 1000}
                    </Col>
                  )
                })}
            </Row>
          </Col>
          <Col xs={3}>
            <Row>
              {[this.state.l2best, ...this.props.l2Laps.map(l => l.time)]
                .filter((l2lap, index) => index < 7 && l2lap !== 0)
                .map((l2lap, index) => {
                  return (
                    <Col
                      key={l2lap.toString() + index.toString()}
                      xs={12}
                      className={
                        (index === 0 ? 'font-weight-bold text-sm' : '') +
                        (index === 1 ? 'text-sm' : '') +
                        (index > 1 ? 'text-sm' : '') +
                        ' mt-2 mb-2'
                      }
                    >
                      {l2lap / 1000}
                    </Col>
                  )
                })}
            </Row>
          </Col>
          <Col xs={3}>
            <Row>
              {[this.state.l3best, ...this.props.l3Laps.map(l => l.time)]
                .filter((l3lap, index) => index < 7 && l3lap !== 0)
                .map((l3lap, index) => {
                  return (
                    <Col
                      key={l3lap.toString() + index.toString()}
                      xs={12}
                      className={
                        (index === 0 ? 'font-weight-bold text-sm' : '') +
                        (index === 1 ? 'text-sm' : '') +
                        (index > 1 ? 'text-sm' : '') +
                        ' mt-2 mb-2'
                      }
                    >
                      {l3lap / 1000}
                    </Col>
                  )
                })}
            </Row>
          </Col>
          <Col xs={3}>
            <Row>
              {[this.state.l4best, ...this.props.l4Laps.map(l => l.time)]
                .filter((l4lap, index) => index < 7 && l4lap !== 0)
                .map((l4lap, index) => {
                  return (
                    <Col
                      key={l4lap.toString() + index.toString()}
                      xs={12}
                      className={
                        (index === 0 ? 'font-weight-bold text-sm' : '') +
                        (index === 1 ? 'text-sm' : '') +
                        (index > 1 ? 'text-sm' : '') +
                        ' mt-2 mb-2'
                      }
                    >
                      {l4lap / 1000}
                    </Col>
                  )
                })}
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

Previous.propTypes = {
  l1Laps: PropTypes.array,
  l2Laps: PropTypes.array,
  l3Laps: PropTypes.array,
  l4Laps: PropTypes.array,
  names: PropTypes.object
}

export default connect(mapStateToProps, null)(Previous)
