export const createFilteredTasks = (tasksData, tasksStatus) => {
    let newArray = [];

    tasksStatus.map((status) => {
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

