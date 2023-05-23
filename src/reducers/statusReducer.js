const statusInitialState = [];

const statusReducer = (tasksStatus, action) => {
    switch (action.type) {
        case 'addStatus':
            const { boardId: id, status } = action;

            return {...tasksStatus, [id]: [...tasksStatus?.[id] || [], status]} ;
        case 'removeStatus':
            const { boardId, colId } = action.statusData;
            const currentBoard = tasksStatus[boardId] ? tasksStatus[boardId].filter(item => item.id !== colId) : [];

            return {...tasksStatus, [boardId]: currentBoard};
        case 'setStatuses':
            return action.statuses;
        default:
            return tasksStatus;
    }
}

export {statusReducer, statusInitialState};
