const tasksInitialState = {};

const tasksReducer = (tasks, action) => {
    switch (action.type) {
        case 'addTask':
            const { boardId: id, colId, task} = action;
            const columnTasks = [...tasks?.[id]?.[colId] || [], task];

            return {...tasks, [id]: { ...tasks[id], [colId]: [...columnTasks] }};
        case 'removeTask':
            const {id: taskId, colId: taskColId, boardId: taskBoardId} = action.taskData;
            const currentCol = (tasks?.[taskBoardId]?.[taskColId] || []).filter(item => item.id !== taskId);

            return {...tasks, [taskBoardId]: {...tasks[taskBoardId], [taskColId]: [...currentCol] }};
        case 'changeTaskStatus':
            const { boardId, columns } = action.data;

            return {...tasks, [boardId]: {...tasks[boardId], ...columns}};
        case 'setTasks':
            return action.tasks;
        default:
            return tasks;
    }
}

export {tasksReducer, tasksInitialState};
