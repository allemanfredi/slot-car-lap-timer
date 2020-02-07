import React, { Component } from 'react'
import {
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import { connect } from 'react-redux'
import { setRaceOptions } from '../../actions/'
import PropTypes from 'prop-types'

const mapStateToProps = _state => {
  return {
    raceStatus: _state.raceStatus,
    raceOptions: _state.raceOptions
  }
}

const mapDispatchToProps = _dispatch => {
  return {
    setRaceOptions: _options => _dispatch(setRaceOptions(_options))
  }
}

class Menu extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      modalIsOpen: false,
      raceTypes: ['Free Practise', 'Timed Practise', 'Race'],
      currentRaceType: props.raceOptions.type,
      currentRaceDuration: props.raceOptions.duration
    }
  }

  save = () => {
    this.setState({ modalIsOpen: false })

    const duration =
      this.state.currentRaceType === 'Free Practise'
        ? 0
        : parseFloat(this.state.currentRaceDuration) * 60

    this.props.setRaceOptions(
      Object.assign({}, this.props.raceOptions, {
        duration,
        type: this.state.currentRaceType
      })
    )
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={12} md={4} lg={2} className="text-center mt-3">
            <Button
              onClick={() => this.setState({ modalIsOpen: true })}
              disabled={this.props.raceStatus === 'running'}
              className="full-width font-weight-bold text-md text-white"
              color="secondary"
            >
              Options
            </Button>
          </Col>
        </Row>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={() => this.setState({ modalIsOpen: false })}>
            Race Options
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs={12} className="mt-2">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Duration in Minutes</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    disabled={this.state.currentRaceType === 'Free Practise'}
                    onChange={e =>
                      this.setState({ currentRaceDuration: e.target.value })
                    }
                    value={
                      this.state.currentRaceDuration !== 0
                        ? this.state.currentRaceDuration
                        : ''
                    }
                    placeholder=""
                  />
                </InputGroup>
                <Input
                  type="select"
                  name="select"
                  id="race-type"
                  className="mt-3"
                  onChange={e =>
                    this.setState({ currentRaceType: e.target.value })
                  }
                  value={this.state.currentRaceType}
                >
                  <option>{this.props.raceOptions.type}</option>
                  {this.state.raceTypes
                    .filter(type => type !== this.props.raceOptions.type)
                    .map(type => {
                      return <option key={type}>{type}</option>
                    })}
                </Input>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={this.save}
              disabled={this.props.raceStatus === 'running'}
              className="full-width font-weight-bold text-md text-white"
              color="primary"
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}

Menu.propTypes = {
  raceStatus: PropTypes.string,
  raceOptions: PropTypes.object,
  setRaceOptions: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
