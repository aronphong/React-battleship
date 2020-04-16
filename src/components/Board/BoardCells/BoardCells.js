import React from 'react'
import BoardCell from './BoardCell/BoardCell'
import styles from './BoardCells.module.css';

const boardCells = (props) => {

    if (props.cells === undefined) {
        return <div className={styles.BoardCells}></div>;
    }

    return (
        <div className={styles.BoardCells}>
            {props.cells.map((cell, index) => {
                return (
                    <BoardCell
                    computerPlayer={props.computerPlayer}
                    content={cell}
                    index={index} 
                    key={index}
                    clicked={props.attackPosition}
                />
                );
            })}
        </div>
    );
}

export default boardCells;