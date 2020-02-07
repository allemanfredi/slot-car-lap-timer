import React from 'react'
import {
  Row,
  Col,
  Card,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setNames } from '../../actions/names'

const mapStateToProps = _state => {
  return {
    names: _state.names,
    sessionTime: _state.sessionTime,
    raceStatus: _state.raceStatus
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    setNames: _names => _dispatch(setNames(_names))
  }
}

const Names = props => {
  return (
    <Card body className="shadow bg-white rounded no-border-color">
      <Row>
        <Col xs={12} lg={3} className="mt-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>L1</InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={e => {
                props.setNames(
                  Object.assign({}, props.names, {
                    l1: e.target.value
                  })
                )
              }}
              disabled={props.raceStatus === 'running'}
              placeholder=""
            />
          </InputGroup>
        </Col>
        <Col xs={12} lg={3} className="mt-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>L2</InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={e => {
                props.setNames(
                  Object.assign({}, props.names, {
                    l2: e.target.value
                  })
                )
              }}
              disabled={props.raceStatus === 'running'}
              placeholder=""
            />
          </InputGroup>
        </Col>
        <Col xs={12} lg={3} className="mt-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>L3</InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={e => {
                props.setNames(
                  Object.assign({}, props.names, {
                    l3: e.target.value
                  })
                )
              }}
              disabled={props.raceStatus === 'running'}
              placeholder=""
            />
          </InputGroup>
        </Col>
        <Col xs={12} lg={3} className="mt-2">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>L4</InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={e => {
                props.setNames(
                  Object.assign({}, props.names, {
                    l4: e.target.value
                  })
                )
              }}
              disabled={props.raceStatus === 'running'}
              placeholder=""
            />
          </InputGroup>
        </Col>
      </Row>
    </Card>
  )
}

Names.propTypes = {
  names: PropTypes.object,
  sessionTime: PropTypes.number,
  raceStatus: PropTypes.string,
  setNames: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Names)
