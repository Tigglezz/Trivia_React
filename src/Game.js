import React, {Component} from 'react';
import Trivia from './Trivia';
import Menu from './Menu';

//Game acts as a store for options / game state
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
          start: false,
          category: "General Knowledge",
          difficulty: "easy",
          timer: 0
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);

      }

   
    handleCategoryChange = (inputCategory) => {
        this.setState({category: inputCategory});
    };

    handleDifficultyChange = (inputDifficulty) => {
        this.setState({difficulty: inputDifficulty});
    };

    handleTimerChange = (inputTimer) => {
        this.setState({timer: inputTimer});
    };

    
    handleStart() {
        // Start Game
        this.setState( { start: true } )
    }
  

    render() {
        if(!this.state.start){
            return (
            <>
            <Menu 
                category={this.state.category} 
                difficulty={this.state.difficulty} 
                timer={this.state.timer} 
                handleCategoryChange={this.handleCategoryChange.bind(this)} 
                handleDifficultyChange={this.handleDifficultyChange.bind(this)} 
                handleTimerChange={this.handleTimerChange.bind(this)} 
                startGame={this.handleStart.bind(this)}
            />
            </>
            )
          }
        return (
            <>
            <Trivia 
                category={this.state.category} 
                difficulty={this.state.difficulty} 
                timer={this.state.timer} 
                start={this.state.start} 
            />
            </>
        );
    }
}
   
export default Game;