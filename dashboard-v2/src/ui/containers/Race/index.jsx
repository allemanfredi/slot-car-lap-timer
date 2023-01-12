import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toSSMM } from '../../utils'

import firebase from '../../lib/firebase'

const mapStateToProps = (_state) => {
  return {
    sessionTime: _state.sessionTime,
    l1Laps: _state.l1Laps,
    l2Laps: _state.l2Laps,
    l3Laps: _state.l3Laps,
    l4Laps: _state.l4Laps,
    l1LapTime: _state.l1LapTime,
    l2LapTime: _state.l2LapTime,
    l3LapTime: _state.l3LapTime,
    l4LapTime: _state.l4LapTime,
    raceOptions: _state.raceOptions,
  }
}

class Race extends Component {
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
      l4Laps: [],
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
        l1best: 0,
        l1Laps: [],
        l2best: 0,
        l2Laps: [],
        l3best: 0,
        l3Laps: [],
        l4best: 0,
        l4Laps: [],
      }
    }

    if (nextProps.l1Laps.length !== prevState.l1Laps.length) {
      firebase
        .ref('live/L1')
        .set({
          l1best: Math.min(...nextProps.l1Laps.map((l) => l.time)),
          l1Laps: nextProps.l1Laps,
        })
        .catch(console.error)

      return {
        l1best: Math.min(...nextProps.l1Laps.map((l) => l.time)),
        l1Laps: nextProps.l1Laps,
      }
    }

    if (nextProps.l2Laps.length !== prevState.l2Laps.length) {
      firebase
        .ref('live/L2')
        .set({
          l2best: Math.min(...nextProps.l2Laps.map((l) => l.time)),
          l2Laps: nextProps.l2Laps,
        })
        .catch(console.error)
      return {
        l2best: Math.min(...nextProps.l2Laps.map((l) => l.time)),
        l2Laps: nextProps.l2Laps,
      }
    }

    if (nextProps.l3Laps.length !== prevState.l3Laps.length) {
      firebase
        .ref('live/L3')
        .set({
          l3best: Math.min(...nextProps.l3Laps.map((l) => l.time)),
          l3Laps: nextProps.l3Laps,
        })
        .catch(console.error)
      return {
        l3best: Math.min(...nextProps.l3Laps.map((l) => l.time)),
        l3Laps: nextProps.l3Laps,
      }
    }

    if (nextProps.l4Laps.length !== prevState.l4Laps.length) {
      firebase
        .ref('live/L4')
        .set({
          l4best: Math.min(...nextProps.l4Laps.map((l) => l.time)),
          l4Laps: nextProps.l4Laps,
        })
        .catch(console.error)
      return {
        l4best: Math.min(...nextProps.l4Laps.map((l) => l.time)),
        l4Laps: nextProps.l4Laps,
      }
    }

    return null
  }

  render() {
    return (
      <div className="rows-wrapper">
        <div className="row-green">
          <div className="row h-100">
            <div className="col-sm-3 my-auto">
              <div className="line">1</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="lap">{toSSMM(this.props.l1LapTime)}</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="last-lap">
                {this.props.l1Laps.length > 0
                  ? toSSMM(this.props.l1Laps[0].time)
                  : '00:00'}
              </div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="best-lap">{toSSMM(this.state.l1best)}</div>
              <br />
              <div className="laps"> {this.props.l1Laps.length}</div>
            </div>
          </div>
        </div>
        <div className="row-red">
          <div className="row h-100">
            <div className="col-sm-3 my-auto">
              <div className="line">2</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="lap">{toSSMM(this.props.l2LapTime)}</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="last-lap">
                {this.props.l2Laps.length > 0
                  ? toSSMM(this.props.l2Laps[0].time)
                  : '00:00'}
              </div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="best-lap">{toSSMM(this.state.l2best)}</div>
              <br />
              <div className="laps"> {this.props.l2Laps.length}</div>
            </div>
          </div>
        </div>
        <div className="row-yellow">
          <div className="row h-100">
            <div className="col-sm-3 my-auto">
              <div className="line">3</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="lap">{toSSMM(this.props.l3LapTime)}</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="last-lap">
                {this.props.l3Laps.length > 0
                  ? toSSMM(this.props.l3Laps[0].time)
                  : '00:00'}
              </div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="best-lap">{toSSMM(this.state.l3best)}</div>
              <br />
              <div className="laps"> {this.props.l3Laps.length}</div>
            </div>
          </div>
        </div>
        <div className="row-blue">
          <div className="row h-100">
            <div className="col-sm-3 my-auto">
              <div className="line">4</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="lap">{toSSMM(this.props.l4LapTime)}</div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="last-lap">
                {this.props.l4Laps.length > 0
                  ? toSSMM(this.props.l4Laps[0].time)
                  : '00:00'}
              </div>
            </div>
            <div className="col-sm-3 my-auto text-center">
              <div className="best-lap">{toSSMM(this.state.l4best)}</div>
              <br />
              <div className="laps"> {this.props.l4Laps.length}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Race)
