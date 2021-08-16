import React, {Component} from 'react';
import { Card } from 'react-bootstrap';

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
        <Card show={this.state.show}>
            <Card.Header>
            <Card.Title>Trivia</Card.Title>
            </Card.Header>
            <Card.Body>Press Start to Play</Card.Body>
            <Card.Footer>
                <button onClick={this.props.start}>Start</button>
            </Card.Footer>
        </Card>
        </form>
        );
    }
}
   
export default Menu;