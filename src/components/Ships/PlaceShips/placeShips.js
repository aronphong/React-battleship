const placeShips = (board, ships) => {
    let shipBoard = board;

    const randomPosition = () => {
        const direction = Math.round(Math.random()) === 0 ? 'row':'column';
        const row = Math.floor(Math.random() * 10);
        const startIndex = Math.floor(Math.random() * 100);
        const placement = {direction, row, startIndex};
        return placement;
    }

    const checkValidPlacement = (placement, shipLength, board) => {
        const direction = placement.direction;
        const startIndex = placement.startIndex;

        if (direction === 'row') {
            if ((startIndex % 10) > shipLength) {
                return false;
            };

            for (let i = 0; i < shipLength; i++) {
                if (board[startIndex + i] !== "") {
                    return false;
                };
            };
        } else {
            if ((shipLength * 10 + startIndex) > 99) {
                return false;
            }
            for (let i = 0; i < (shipLength * 10); i+= 10) {
                if (board[startIndex + i] !== "") {
                    return false;
                }
            }
        }
        return true;
    }

    // eslint-disable-next-line array-callback-return
    ships.map(ship => {
        let position = randomPosition();
        const shipLength = ship.length;

        let positionCheck = checkValidPlacement(position, shipLength, shipBoard);
            while (positionCheck === false) {
                position = randomPosition();
                positionCheck = checkValidPlacement(position, shipLength, shipBoard);
            };

        if (positionCheck === true && position.direction === 'row') {
            for (let i = 0; i < shipLength; i++) {
                shipBoard[position.startIndex + i] = ship.shipSymbol;
            }
        } 
        if (positionCheck === true && position.direction === 'column') {
            for (let i = 0; i < (shipLength * 10); i+=10) {
                shipBoard[position.startIndex + i] = ship.shipSymbol;
            }
        };
    });
    return shipBoard;
}

export default placeShips;