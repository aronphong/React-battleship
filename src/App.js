import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import Game from './containers/Game/Game';

class App extends Component {
  state = {
    gameStart: false,
    humanTurn: true,
  };

  // turn false will disable abiliity to click
  render() {
    return (
      <React.Fragment>
      <Layout>
        <Game isPc={false}/>
        <Game isPc={true}/>
      </Layout>
      </React.Fragment>

    );
  }
}

export default App;
