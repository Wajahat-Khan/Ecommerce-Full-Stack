import React from "react";
import { Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { closeErrorModal } from '../../js/actions';
import { connect } from 'react-redux';

class Error extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {closeError, show, errorMessage} = this.props;
        return (
            <Modal show={show} onHide={closeError}>
                <Modal.Header closeButton>
                    <Modal.Title>ERROR</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeError}>
                        OK
            </Button>

                </Modal.Footer>
            </Modal>)
    }
}
const mapDispatchToProps = dispatch => {
    return {
     
      closeError:payload => dispatch(closeErrorModal(payload))
    }
  }
  const mapStateToProps = state => {
    return { errorMessage:state.errorMessage }
  }
export default  connect(mapStateToProps, mapDispatchToProps)(Error)