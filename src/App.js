import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Game from './containers/Game/Game';
import styles from './App.module.css';

class App extends Component {
  state = {
    gameStart: false,
    humanTurn: true,
    computerDifficulty: 'easy'
  };

  handleGameTurn = () => {
    this.setState({humanTurn: !this.state.humanTurn})
  }

  handleGameStart = () => {
    this.setState({gameStart: true})
  }

  handleComputerDifficulty = () => {
    if (this.state.gameStart === true) {
      return;
    };
    
    const difficulty = this.state.computerDifficulty === 'easy' ? 'medium' : 'easy';
    this.setState({computerDifficulty: difficulty})
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.Head}>
          <button onClick={this.handleGameStart}>Play</button>
          <h1>Battleship</h1>
          <button onClick={this.handleComputerDifficulty}>Difficulty: {this.state.computerDifficulty}</button>
        </div>

        <Layout>
          <Game
            gameStart = {this.state.gameStart} 
            computerBoard={false}
            humanTurn={this.state.humanTurn}
            turnSwitch={this.handleGameTurn}
            difficulty={this.state.computerDifficulty}
          />
          <Game
            gameStart = {this.state.gameStart}  
            computerBoard={true} 
            humanTurn={this.state.humanTurn}
            turnSwitch={this.handleGameTurn}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
