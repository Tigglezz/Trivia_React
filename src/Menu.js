import React, {Component} from 'react';
import { Modal } from 'react-bootstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: true
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
      }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
        <form onSubmit={this.hideModal}>
        <Modal show={this.state.show}>
            <Modal.Header>
            <Modal.Title>Hi</Modal.Title>
            </Modal.Header>
            <Modal.Body>The body</Modal.Body>
            <Modal.Footer>
                <button onClick={this.props.start}>Start</button>
            </Modal.Footer>
        </Modal>
        </form>
        );
    }
}
   
export default Menu;