import React, {Component} from 'react';
import { Button, Card, Spinner, ProgressBar, Badge} from 'react-bootstrap';
import { decode } from 'he';

class Trivia extends Component {
    constructor(props){
        super(props)
        this.state = {
            categoryID: 0,
            roundEnd: false,
            options: [],
            playerResponse: "",
            questions: [],
            round: 0,
            turn: 0,
            score: 0
          };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.startRound = this.startRound.bind(this)
    }

    componentDidMount() {
      // Get cat Id then questions set of 10 for round
      this.getCategoryID();
    }

    componentDidUpdate(prevState, prevProps) {
      // we access props with this.props
      // and state with this.state
      
      // prevState contains state before update
      // prevProps contains props before update
      
    }

    getCategoryID = async () => {
      // Category lookup https://opentdb.com/api_category.php
      fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(
      (res) => {
          for (let index in res.trivia_categories){
          let cat = res.trivia_categories[index];
          
          if(cat.name === this.props.category){
              this.setState({
                  categoryID: cat.id
              }, () => {
                  this.getQuestions()
              });
          }
      }
      });
  }

    getQuestions = async () => {
      // Get questions set of 10 for round
      // Reset questions
      fetch(`https://opentdb.com/api.php?amount=10&category=${this.state.categoryID}&type=multiple`)
      .then(res => res.json())
      .then(
      (res) => {
        this.setState({
          questions: res.results,
        }, () => {
          this.setAnswers()
        });
  
      },
      (error) => {
        this.setState({
          error,
          isLoaded: true
        });
      })
    }

    // Handle player answer
    handleSubmit = async (event) => {
      event.preventDefault(); //stop refresh    
      // Increase score if correct
      if(event.target.value === this.state.questions[this.state.turn].correct_answer)
      {
        this.setState( { score: this.state.score + 1 } )
      }

      this.setState({
        turn: this.state.turn + 1,
      }, () => {      
        // Go to next question
        this.setAnswers()
      });
    }

    // Set answers / options for player
    setAnswers = async () => {
      let index = this.state.turn
      let answer = this.state.questions[index].correct_answer
      let opt = [answer].concat(this.state.questions[index].incorrect_answers)

      //shuffle and set options
      await this.shuffleArray(opt)
      this.setState({
        options: opt,
      }, () => {
        this.setState( { isLoaded: true } )
      });
      
    }

    // Reset states and get 10 more questions
    startRound = async () => {
      this.setState({
        turn: 0,
        score: 0,
        isLoaded:  false
      }, () => {
        this.getQuestions()
      });
    }

    // O(n)
    shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
    // render element based on state
    render() {
      const { error, isLoaded } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return (
          <>
            <h3>Loading</h3>
            <h5><Spinner animation="grow" variant="info" size="sm"/>   <Spinner animation="grow" variant="info" size="sm"/>   <Spinner animation="grow" variant="info" size="sm"/></h5>
          </>
        )
      } else {
        if(this.state.turn === 10){
          return (    
            <> 
            <Card id="endRoundContainer">
              <Card.Header id="score">
                {this.state.score} / 10
              </Card.Header>
              <Card.Footer className="d-grid gap-2">
                  <Button value="cont" onClick={this.startRound} size="lg">Continue?</Button>
              </Card.Footer>
            </Card>
            </>
          )
        } else{
          return (    
            <> 
            <Card id="trivia_container">
              <Card.Body id="question">
                <Card.Title>{ decode(this.state.questions[this.state.turn].question) }</Card.Title>
                  <Badge className="position-absolute top-0 start-0 translate-middle bg-success">{this.state.score}</Badge>
                  <Badge className="position-absolute top-0 start-100 translate-middle bg-primary">{this.state.questions[this.state.turn].difficulty}</Badge>
                <Card.Subtitle>
                  {this.state.questions[this.state.turn].category}<br/>
                  {this.props.timer}<br/>
                  {this.props.difficulty}
                </Card.Subtitle>
              </Card.Body>
              <Card.Footer className="d-grid gap-2">
                  <Button value={this.state.options[0]} onClick={this.handleSubmit} size="lg">{ decode(this.state.options[0]) }</Button>
                  <Button value={this.state.options[1]} onClick={this.handleSubmit} size="lg">{ decode(this.state.options[1]) }</Button>
                  <Button value={this.state.options[2]} onClick={this.handleSubmit} size="lg">{ decode(this.state.options[2]) }</Button>
                  <Button value={this.state.options[3]} onClick={this.handleSubmit} size="lg">{ decode(this.state.options[3]) }</Button>
              </Card.Footer>
              <ProgressBar animated variant="success" now={(this.state.turn + 1) * 10} label={`${this.state.turn + 1} / 10`}/>
            </Card>
            </>
          ); 
        }
      }
    }
} 

export default Trivia;
  