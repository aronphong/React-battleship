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

    componentDidUpdate(prevProps) {
        if (this.props.gameStart !== prevProps.gameStart) {
            if (this.props.gameStart === true) {
                this.shipsPlacement();
            } else {
                this.resetBoard();
            }
            
        };

        if (this.props.humanTurn !== prevProps.humanTurn) {
            if (this.props.humanTurn === false && this.props.computerBoard === false) {
                const randomIndex = this.handleComputerAttack();
                this.handleAttackPosition(randomIndex);
            };
        };
    }

    // can change to reset placement if wanted
    shipsPlacement = () => {
        if (this.props.gameStart === false) {
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
    
    handleComputerAttack = () => {
        let currentAttackHistory = this.state.attackHistory.slice().reverse();
        let latestHitIndex = false;
        let arrHistory = currentAttackHistory.map(move => move[0]);

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
                // shuffle directions arr
                let directions = ['left', 'up', 'right', 'down'];
                for (let i = directions.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [directions[i], directions[j]] = [directions[j], directions[i]];
                }

                let nextMove = latestHitIndex;
                let counter = 0;

                while (arrHistory.includes(nextMove)) {
                    nextMove = latestHitIndex;
                    if (directions[counter] === 'left') {
                        nextMove-= 1;
                    } else if (directions[counter] === 'up') {
                        nextMove-= 10;
                    } else if (directions[counter] === 'right') {
                        nextMove+= 1;
                    } else if (directions[counter] === 'down') {
                        nextMove+= 10;
                    } else {
                        nextMove = Math.floor(Math.random() * 100);
                    }

                    if (nextMove < 0 || nextMove > 99) {
                        nextMove = Math.floor(Math.random() * 100);
                    }
                    counter++;
                }; 
                return nextMove;
            }
        }

        // fix logic check / edge cases
        let randomMove = Math.floor(Math.random() * 100);
        while (arrHistory.includes(randomMove)) {
            randomMove = Math.floor(Math.random() * 100);
        }
        return randomMove;
    }

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
            return;
        }

        let ships = this.state.ships.slice();
        let shipSunk = false;
        ships.map(ship => {
            if (ship.shipSymbol === currentCellValue) {
                ship.life--;
                if (ship.life === 0) {
                    ship.isSunk = true;
                    shipSunk = true;
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

        let shipsRemain = null;
        if (this.props.gameStart) {
            shipsRemain = this.state.ships.slice().map(ship => {
                return <li 
                        key={ship.name} 
                        className={ship.isSunk ? styles.sunk : null}>
                            {ship.name}</li>
            });
        };
        
        return (
            <div className={styles.Game}>
                <div className={styles.Messages}>
                    {player}
                    <ul>
                        {shipsRemain}
                    </ul>
                </div>
                <Board
                cells={this.state.cells}
                computerPlayer={this.props.computerBoard}
                attackPosition={this.handleAttackPosition}
                />
            </div>
        );
    }
}

export default Game;
