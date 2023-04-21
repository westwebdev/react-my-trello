export const createFilteredTasks = (tasksData, tasksStatusState) => {
    let newArray = [];

    tasksStatusState.map((status) => {
        let filteredTasks = tasksData.filter(task => task.status === status.id);

        if (filteredTasks.length) {
            newArray.push({
                id: status.id,
                title: status.title,
                tasks: filteredTasks
            });
        }
    });

    return newArray;
}
