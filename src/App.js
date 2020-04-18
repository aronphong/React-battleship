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
    this.setState({gameStart: !this.state.gameStart})
  }

  handleComputerDifficulty = () => {
    if (this.state.gameStart === true) {
      return;
    };
    
    const difficulty = this.state.computerDifficulty === 'easy' ? 'medium' : 'easy';
    this.setState({computerDifficulty: difficulty})
  }

  handleGameWin = (winner) => {
    alert(winner);
    this.setState({gameStart: false});
  }

  render() {
    const play = this.state.gameStart ? 'Reset Board' : 'Start Game';
    return (
      <div className={styles.App}>
        <div className={styles.Head}>
          <button onClick={this.handleGameStart}>{play}</button>
          <h1>Battleship</h1>
          <button onClick={this.handleComputerDifficulty}>Difficulty: {this.state.computerDifficulty}</button>
        </div>

        <Layout>
        <Game
            gameStart = {this.state.gameStart}  
            computerBoard={true} 
            humanTurn={this.state.humanTurn}
            turnSwitch={this.handleGameTurn}
            win={this.handleGameWin}
          />
          <Game
            gameStart = {this.state.gameStart} 
            computerBoard={false}
            humanTurn={this.state.humanTurn}
            turnSwitch={this.handleGameTurn}
            difficulty={this.state.computerDifficulty}
            win={this.handleGameWin}
          />
        </Layout>
      </div>
    );
  }
}

export default App;
