import React, { Component } from 'react';
import styles from './Game.module.css';
import {default as Board} from '../../components/Board/BoardCells/BoardCells';
import placeShips from '../../components/Ships/PlaceShips/placeShips';

const SHIPS = [
    {name: 'Carrier',length: 5, shipSymbol: 'C'},
    {name: 'Battleship',length: 4, shipSymbol: 'B'},
    {name: 'Destroyer',length: 3, shipSymbol: 'D'},
    {name: 'Submarine', length: 3, shipSymbol: 'S'},
    {name: 'Patrol', length: 2, shipSymbol: 'P'},
];

class Game extends Component {
    state = {
        cells: Array(100).fill(''),
        whosTurn: this.props.humanTurn,
        ships: [
            {
                name: 'Carrier',
                life: 5,
                shipSymbol: 'C',
                isSunk: false
            },
            {
                name: 'Battleship',
                life: 4,
                shipSymbol: 'B',
                isSunk: false
            },
            {
                name: 'Destroyer',
                life: 3,
                shipSymbol: 'D',
                isSunk: false
            },
            {
                name: 'Submarine',
                life: 3,
                shipSymbol: 'S',
                isSunk: false
            },
            {
                name: 'Patrol Boat',
                life: 2,
                shipSymbol: 'P',
                isSunk: false
            },
        ]
    };

    // can change to reset placement if wanted
    shipsPlacement = () => {
        const board = [...this.state.cells];
        if (board.every(cell => cell !== '') === true) {
            return;
        };
        const shipBoard = placeShips(board, SHIPS);
        this.setState({cells: shipBoard});
    }

    resetBoard = () => {
        this.setState({cells: Array(100).fill('')})
    }

    // if you make a move switch turns
    // lift state up a level
    handleAttackPosition = (index) => {
        const currentBoard = [...this.state.cells];
            if (currentBoard.every(cell => cell === '') === true) {
                return;
            };
            
        let ships = this.state.ships.slice();
        let currentCellValue = currentBoard[index];

        if (currentCellValue === "") {
            currentBoard[index] = "M";
        };
        if (currentCellValue === "X" || currentCellValue === "M") {
            return console.log('Cell already hit!');
        }

        ships.map(ship => {
            if (ship.shipSymbol === currentCellValue) {
                ship.life--;
                if (ship.life === 0) {
                    ship.isSunk = true;
                    console.log(ship.name + ' is destroyed!')
                }
                currentBoard[index] = "X";
            }
            return ship;
        });
    
        this.setState({
            cells: currentBoard,
            ships: ships
        });
    }

    render() {
        const player = this.props.isPc ? <h1>Computer Board</h1> : <h1>Your Board</h1>;

        // fix logic for buttons to hide when game is on going 
        // fix logic that board has no event listeners when 
        return (
            <div className={styles.Game}>
                {player}
                <Board
                cells={this.state.cells}
                attackPosition={this.handleAttackPosition}
                />
                <button onClick={this.shipsPlacement}>Place Ships</button>
                <button onClick={this.resetBoard}>Reset Board</button>
            </div>
        );
    }
}

export default Game;
