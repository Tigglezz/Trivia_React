import React, {Component, useState} from 'react';
import { Card, Button, Dropdown, DropdownButton, Spinner, Form, Col, Row } from 'react-bootstrap';
import TimeSlider from './Components/Slider';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: true,
          categories: [],
          range: 30
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.setRange = this.setRange.bind(this);

      }

    componentDidMount = () => {
        // Get categories
        this.getCategories();
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleCategoryChange = (e) => {
        this.props.handleCategoryChange(e)
    };

    handleDifficultyChange = (e) => {
        this.props.handleDifficultyChange(e)
    };

    handleTimerChange = (e) => {
        this.props.handleTimerChange(e)
    };

    setRange = (e) => {
        this.setState({ timer: e.target.value });
    };

    getCategories = async () => {
        // Category lookup https://opentdb.com/api_category.php
        fetch("https://opentdb.com/api_category.php")
        .then(res => res.json())
        .then(
        (res) => {
            for (let index in res.trivia_categories){
                this.setState({
                    categories: this.state.categories.concat(res.trivia_categories[index].name)
                })  
            }
        });

        this.setState({
            isLoaded: true
        })  
    }

    render() {
        const { isLoaded } = this.state;

        if (!isLoaded || this.state.categories.length === 0) {
            return (
            <>
            <h3>Loading</h3>
            <h5><Spinner animation="grow" variant="info" size="sm"/>   <Spinner animation="grow" variant="info" size="sm"/>   <Spinner animation="grow" variant="info" size="sm"/></h5>
              </>
            )
        } else {
            return (
            <Card show={this.state.show}>
                <Card.Header>
                <Card.Title>Trivia</Card.Title>
                </Card.Header>
                <Card.Body>
                <Row>
                    <Col xs="8" className="my-1">
                        <Dropdown >
                            <Dropdown.Header>Category</Dropdown.Header>
                            <DropdownButton 
                                variant="success" 
                                title={this.props.category}
                                onSelect={this.handleCategoryChange}
                            >
                                {this.state.categories.map((cat, index) => {
                                    return <Dropdown.Item eventKey={this.state.categories[index]}>{this.state.categories[index]}</Dropdown.Item>
                                })}
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                    <Col xs="4" className="my-1">
                        <Dropdown >
                            <Dropdown.Header>Difficulty</Dropdown.Header>
                            <DropdownButton 
                                variant="warning"
                                title={this.props.difficulty}
                                onSelect={this.handleDifficultyChange}
                            >
                            <Dropdown.Item eventKey="any">Any</Dropdown.Item>
                            <Dropdown.Item eventKey="easy">Easy</Dropdown.Item>
                            <Dropdown.Item eventKey="medium">Medium</Dropdown.Item>
                            <Dropdown.Item eventKey="hard">Hard</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <TimeSlider />
                </Row>
             
                </Card.Body>
                <Card.Footer>
                    <Button onClick={this.props.startGame}>Start</Button>
                </Card.Footer>
            </Card>
        );
        }
    }
}
   
export default Menu;