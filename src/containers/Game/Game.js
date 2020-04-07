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
        attackHistory: [],
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

    shouldComponentUpdate(nextProps) {
        if (nextProps.gameStart === true) {
            this.shipsPlacement();
            return true;
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.humanTurn !== prevProps.humanTurn) {
            if (this.props.humanTurn === false && this.props.computerBoard === false) {
                const randomIndex = this.handleComputerAttack();
                this.handleAttackPosition(randomIndex);
            }
        }
    }
    // can change to reset placement if wanted
    shipsPlacement = () => {
        if (this.props.shipsPlaced) {
            return;
        }

        const board = [...this.state.cells];
        if (board.every(cell => cell === '') === false) {
            return;
        };
        const shipBoard = placeShips(board, SHIPS);
        this.setState({cells: shipBoard});
    }

    resetBoard = () => {
        this.setState({cells: Array(100).fill('')})
    }
    
    // if difficulty set to medium/hard,
    // if latest move was an X, next move will be around the area else random
    handleComputerAttack = () => {
        let currentAttackHistory = this.state.attackHistory.slice().reverse();
        let latestHitIndex = false;
        let arrHistory = currentAttackHistory.map(move => move[0]);
        console.log(currentAttackHistory);
        if (this.props.difficulty === 'medium') {
            for (let i = 0; i < 4; i++) {
                try {
                    if (currentAttackHistory[i][1] === 'X' && currentAttackHistory[i][2] === false) {
                        latestHitIndex = currentAttackHistory[i][0];
                        break;
                    }
                } catch {
                    continue;
                };
            };

            if (latestHitIndex) {
                // 0 left, 1 up, 2 right, 3 down
                let randomDirection = Math.floor(Math.random() * 4); 
                let nextMove = latestHitIndex;
                if (randomDirection === 1) {
                    nextMove--;
                } else if (randomDirection === 2) {
                    nextMove = nextMove - 10;
                } else if (randomDirection === 3) {
                    nextMove++;
                } else if (randomDirection === 4) {
                    nextMove = nextMove + 10;
                };

                let counter = 0;
                while (arrHistory.includes(nextMove)) {
                    randomDirection = Math.floor(Math.random() * 4);
                    nextMove = latestHitIndex;
                    if (randomDirection === 1) {
                        nextMove--;
                    } else if (randomDirection === 2) {
                        nextMove = nextMove - 10;
                    } else if (randomDirection === 3) {
                        nextMove++;
                    } else if (randomDirection === 4) {
                        nextMove = nextMove + 10;
                    };
                    
                    if (counter >= 4) {
                        nextMove = Math.floor(Math.random() * 100);
                    };
                    counter++;
                };
                return nextMove;
            };
        }

        // fix logic check
        let randomMove = Math.floor(Math.random() * 100);
        while (arrHistory.includes(randomMove)) {
            randomMove = Math.floor(Math.random() * 100);
        }
        return randomMove;
    }

    // if you make a move switch turns
    // lift state up a level
    handleAttackPosition = (index) => {
        if (this.props.computerBoard === false && this.props.humanTurn === true) {
            return
        };

        const currentBoard = [...this.state.cells];
        if (currentBoard.every(cell => cell === '') === true) {
            return;
        };

        let currentCellValue = currentBoard[index];
        if (currentCellValue === "") {
            currentBoard[index] = "M";
        };
        if (currentCellValue === "X" || currentCellValue === "M") {
            return console.log('Cell already hit!');
        }

        let ships = this.state.ships.slice();
        let shipSunk = false;
        ships.map(ship => {
            if (ship.shipSymbol === currentCellValue) {
                ship.life--;
                if (ship.life === 0) {
                    ship.isSunk = true;
                    shipSunk = true;
                    console.log(ship.name + ' is destroyed!')
                }
                currentBoard[index] = "X";
            }
            return ship;
        });

        this.handleAttackHistory(index, currentBoard[index], shipSunk);
        this.props.turnSwitch();
        this.setState({
            cells: currentBoard,
            ships: ships
        });
    }

    handleAttackHistory = (index, result, shipSunk) => {
        let currentAttackHistory = this.state.attackHistory.slice();
        currentAttackHistory.push([index, result, shipSunk]);
        this.setState({attackHistory: currentAttackHistory})
    }

    render() {
        const player = this.props.computerBoard ? <h1>Computer Board</h1> : <h1>Your Board</h1>;
        return (
            <div className={styles.Game}>
                {player}
                <Board
                cells={this.state.cells}
                computerPlayer={this.props.computerBoard}
                attackPosition={this.handleAttackPosition}
                />
                {/* <button onClick={this.shipsPlacement}>Place Ships</button> */}
                {/* <button onClick={this.resetBoard}>Reset Board</button> */}
            </div>
        );
    }
}

export default Game;
