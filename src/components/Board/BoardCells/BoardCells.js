import React from 'react'
import BoardCell from './BoardCell/BoardCell'
import styles from './BoardCells.module.css';

const boardCells = (props) => {


    return (
        <div className={styles.BoardCells}>
            {props.cells.map((cell, index) => {
                return (
                    <BoardCell
                    content={cell}
                    index={index} 
                    key={index}
                    // clicked={() => console.log(index, cell)}
                    clicked={props.attackPosition}
                />
                );
            })}
        </div>
    );
}

export default boardCells;