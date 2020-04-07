import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Game from './containers/Game/Game';
import styles from './App.module.css';

class App extends Component {
  state = {
    gameStart: false,
    humanTurn: true,
    shipsPlaced: false,
    computerDifficulty: 'medium'
  };

  handleGameTurn = () => {
    this.setState({humanTurn: !this.state.humanTurn})
  }

  handleGameStart = () => {
    this.setState({gameStart: true})
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.Head}>
          <button onClick={this.handleGameStart}>Play</button>
          <h1>Battleship</h1>
          <button>Difficulty: {this.state.computerDifficulty}</button>
        </div>

        <Layout>
          <Game
            gameStart = {this.state.gameStart} 
            computerBoard={false}
            shipsPlaced={this.state.shipsPlaced} 
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
