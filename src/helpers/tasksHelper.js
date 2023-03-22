import statusData from "../data/taskStatus";

export const createFilteredTasks = (tasksData) => {
    let newArray = [];

    statusData.map((status) => {
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

