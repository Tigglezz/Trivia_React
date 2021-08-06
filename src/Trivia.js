import React, {Component} from 'react';
import { Button, Card, Modal, Spinner } from 'react-bootstrap';
import Menu from './Menu';

class Trivia extends Component {
    constructor(props){
        super(props)
        this.state = {
            start: false,
            options: [],
            playerResponse: "",
            questions: [],
            round: 0,
            turn: 0,
            score: 0
          };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.start = this.start.bind(this)

    }

    componentDidMount() {
        // Get questions set of 10 for round
        fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then(res => res.json())
        .then(
        (res) => {
          this.setState({
            isLoaded: true,
            questions: res.results
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    start() {
      this.setState( { start: true } )

      // Set answers
      this.setAnswers()
    }

    // Handle player answer
    handleSubmit(event) {
      event.preventDefault(); //stop refresh      
      // Increase score if correct
      if(event.target.value === this.state.questions[this.state.turn].correct_answer)
      {
        this.setState( { score: this.state.score + 1 } )
      }
    
      // Go to next question
      this.setState( { turn: this.state.turn + 1 } )// increase turn first
      this.setAnswers()
    }

    setAnswers(){
      // Set answers
      let answer = this.state.questions[this.state.turn].correct_answer
      let opt = [answer].concat(this.state.questions[this.state.turn].incorrect_answers)
      //shuffle and set options
      this.shuffleArray(opt)
      this.setState( { options: opt } )
    }

    // O(n)
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    render() {
        const { error, isLoaded } = this.state;

        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <Spinner animation="grow" variant="info"/>
        } else {
          if(!this.state.start){
            return <Menu start = {this.start}/>
          }
          else{
            return (    
              <> 
              <Card id="trivia_container">
                <Card.Body id="question">
                  <Card.Title>{this.state.questions[this.state.turn].question}</Card.Title>
                  <Card.Subtitle>
                  {this.state.questions[this.state.turn].difficulty}
                  {this.state.score}
                  {this.state.turn}
                  </Card.Subtitle>
                  
                </Card.Body>
                <Card.Footer className="d-grid gap-2">
                    <Button value={this.state.options[0]} onClick={this.handleSubmit} size="lg">{this.state.options[0]}</Button>
                    <Button value={this.state.options[1]} onClick={this.handleSubmit} size="lg">{this.state.options[1]}</Button>
                    <Button value={this.state.options[2]} onClick={this.handleSubmit} size="lg">{this.state.options[2]}</Button>
                    <Button value={this.state.options[3]} onClick={this.handleSubmit} size="lg">{this.state.options[3]}</Button>
                </Card.Footer>
              </Card>
              </>
            ); 
          }
          
        }
      }
} 

export default Trivia;
  