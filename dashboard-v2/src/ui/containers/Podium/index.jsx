import React, { Component } from 'react'
import { Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { groupBy, getSum } from '../../utils'
import { setRaceStatus } from '../../actions'
import firebase from '../../lib/firebase'

const UINT_MAX = Math.pow(2, 32)

const mapStateToProps = (_state) => {
  return {
    l1Laps: _state.l1Laps,
    l2Laps: _state.l2Laps,
    l3Laps: _state.l3Laps,
    l4Laps: _state.l4Laps,
    names: _state.names,
    raceOptions: _state.raceOptions,
    raceStatus: _state.raceStatus,
  }
}

const mapDispatchToProps = (_dispatch) => {
  return {
    setRaceStatus: (_status) => _dispatch(setRaceStatus(_status)),
  }
}

class Podium extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      l1best: UINT_MAX,
      l2best: UINT_MAX,
      l3best: UINT_MAX,
      l4best: UINT_MAX,
      l1totalTime: UINT_MAX,
      l2totalTime: UINT_MAX,
      l3totalTime: UINT_MAX,
      l4totalTime: UINT_MAX,
      l1Laps: [],
      l2Laps: [],
      l3Laps: [],
      l4Laps: [],
      result: [
        {
          lane: 'L1',
          best: UINT_MAX,
        },
        {
          lane: 'L2',
          best: UINT_MAX,
        },
        {
          lane: 'L3',
          best: UINT_MAX,
        },
        {
          lane: 'L4',
          best: UINT_MAX,
        },
      ],
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.l1Laps.length === 0 &&
      nextProps.l2Laps.length === 0 &&
      nextProps.l3Laps.length === 0 &&
      nextProps.l4Laps.length === 0
    ) {
      return {
        l1Laps: [],
        l2Laps: [],
        l3Laps: [],
        l4Laps: [],
        result: [
          {
            lane: 'L1',
            best: UINT_MAX,
          },
          {
            lane: 'L2',
            best: UINT_MAX,
          },
          {
            lane: 'L3',
            best: UINT_MAX,
          },
          {
            lane: 'L4',
            best: UINT_MAX,
          },
        ],
      }
    }

    if (nextProps.l1Laps.length !== prevState.l1Laps.length) {
      return {
        l1Laps: nextProps.l1Laps,
      }
    }

    if (nextProps.l2Laps.length !== prevState.l2Laps.length) {
      return {
        l2Laps: nextProps.l2Laps,
      }
    }

    if (nextProps.l3Laps.length !== prevState.l3Laps.length) {
      return {
        l3Laps: nextProps.l3Laps,
      }
    }

    if (nextProps.l4Laps.length !== prevState.l4Laps.length) {
      return {
        l4Laps: nextProps.l4Laps,
      }
    }
    return null
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (this.props.l1Laps.length !== _prevState.l1Laps.length) {
      this.calculatePodium()
    }
    if (this.props.l2Laps.length !== _prevState.l2Laps.length) {
      this.calculatePodium()
    }
    if (this.props.l3Laps.length !== _prevState.l3Laps.length) {
      this.calculatePodium()
    }
    if (this.props.l4Laps.length !== _prevState.l4Laps.length) {
      this.calculatePodium()
    }
  }

  calculatePodium = () => {
    const sortedByNumberOfLaps = [
      {
        best:
          this.props.l1Laps.length > 0
            ? Math.min(...this.props.l1Laps.map((l) => l.time))
            : UINT_MAX,
        lane: 'L1',
        numberOfLaps: this.props.l1Laps.length,
        ends: this.props.l1Laps.map((l) => l.when),
        totalTime:
          this.props.l1Laps.length > 0
            ? getSum(this.props.l1Laps.map((l) => l.time))
            : UINT_MAX,
      },
      {
        best:
          this.props.l2Laps.length > 0
            ? Math.min(...this.props.l2Laps.map((l) => l.time))
            : UINT_MAX,
        lane: 'L2',
        numberOfLaps: this.props.l2Laps.length,
        ends: this.props.l2Laps.map((l) => l.when),
        totalTime:
          this.props.l1Laps.length > 0
            ? getSum(this.props.l2Laps.map((l) => l.time))
            : UINT_MAX,
      },
      {
        best:
          this.props.l3Laps.length > 0
            ? Math.min(...this.props.l3Laps.map((l) => l.time))
            : UINT_MAX,
        lane: 'L3',
        numberOfLaps: this.props.l3Laps.length,
        ends: this.props.l3Laps.map((l) => l.when),
        totalTime:
          this.props.l1Laps.length > 0
            ? getSum(this.props.l3Laps.map((l) => l.time))
            : UINT_MAX,
      },
      {
        best:
          this.props.l4Laps.length > 0
            ? Math.min(...this.props.l4Laps.map((l) => l.time))
            : UINT_MAX,
        lane: 'L4',
        numberOfLaps: this.props.l4Laps.length,
        ends: this.props.l4Laps.map((l) => l.when),
        totalTime:
          this.props.l1Laps.length > 0
            ? getSum(this.props.l4Laps.map((l) => l.time))
            : UINT_MAX,
      },
    ].sort((obj1, obj2) => (obj1.numberOfLaps > obj2.numberOfLaps ? -1 : 1))
    const groupedByNumberOfLaps = groupBy(sortedByNumberOfLaps, 'numberOfLaps')
    const groupedAndSortedByNumberOfLaps = Object.keys(groupedByNumberOfLaps)
      .sort((l1, l2) => (l1 > l2 ? -1 : 1))
      .map((k) => groupedByNumberOfLaps[k])

    const result = []
    //works because are grouped by number of laps ([0] because new lap are .push())
    groupedAndSortedByNumberOfLaps.forEach((obj) => {
      result.push(...obj.sort((g1, g2) => (g1.ends[0] < g2.ends[0] ? -1 : 1)))
    })

    firebase.ref('podium').set(result).catch(console.error)

    this.setState({
      result,
    })
  }

  calculateGap = (_prev, _current) => {
    const prevEnd = _prev[0]
    const currentEnd = _current[0]
    return ` - ${Math.abs(prevEnd - currentEnd) / 1000}`
  }

  render() {
    return (
      <Modal isOpen={this.props.raceStatus === 'terminated' ? true : false}>
        <ModalHeader toggle={() => this.props.setRaceStatus('stopped')} />
        <ModalBody>
          <Row>
            <Col xs={12} className="mt-3 text-center">
              <img
                src="./material/svg/1.svg"
                height="300"
                width="300"
                alt="winnerlogo"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="mt-3 text-center text-md">
              <span className="font-weight-bold">
                {this.props.names[this.state.result[0].lane.toLowerCase()]
                  ? `${
                      this.props.names[this.state.result[0].lane.toLowerCase()]
                    } `
                  : ' '}
              </span>
              <span className="font-weight-bold">
                {` ${this.state.result[0].lane}`}
              </span>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
  }
}

Podium.propTypes = {
  l1Laps: PropTypes.array,
  l2Laps: PropTypes.array,
  l3Laps: PropTypes.array,
  l4Laps: PropTypes.array,
  names: PropTypes.object,
  raceOptions: PropTypes.object,
  raceStatus: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Podium)
