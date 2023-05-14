const boardInitialState = [];

const boardReducer = (board, action) => {
    switch (action.type) {
        case 'addBoard':
            return [action.newBoard, ...board] ;
        case 'removeBoard':
            return [...board.filter(item => item.id !== action.board.id)];
        case 'setBoards':
            return action.boards;
        default:
            return board;
    }
}

export {boardReducer, boardInitialState};
