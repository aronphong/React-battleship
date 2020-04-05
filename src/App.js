import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Game from './containers/Game/Game';

class App extends Component {
  state = {
    gameStart: false,
    humanTurn: true,
    shipsPlaced: false
  };

  handleGameTurn = () => {
    this.setState({humanTurn: !this.state.humanTurn})
  }

  render() {
    return (
      <Layout>
        <Game
          gameStart = {this.state.gameStart} 
          computerBoard={false}
          shipsPlaced={this.state.shipsPlaced} 
          humanTurn={this.state.humanTurn}
          turnSwitch={this.handleGameTurn}
        />
        <Game
          gameStart = {this.state.gameStart}  
          computerBoard={true} 
          humanTurn={this.state.humanTurn}
          turnSwitch={this.handleGameTurn}
          
        />
      </Layout>
    );
  }
}

export default App;
