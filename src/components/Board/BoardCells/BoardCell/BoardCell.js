import React from 'react';
import styles from './BoardCell.module.css';

// assign color to text if hit or miss
const boardCell = (props) => {

    let classes = [styles.BoardCell];
    if (props.computerPlayer === true) {
        classes.push(styles.pc);
    }
    if (props.content === "X") {
        classes.push(styles.hit);
    }
    if (props.content === "M") {
        classes.push(styles.miss);
    }

    return (
        <div 
        className={classes.join(' ')}
        onClick={() => props.clicked(props.index)}
        >
            {props.content}
        </div>
    );
}
    

export default  boardCell;