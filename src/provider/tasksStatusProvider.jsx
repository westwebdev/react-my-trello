import { useState } from "react";
import { TasksStatusContext } from "../context/tasksStatusContext";

let tasksStatusAction = null;

const TasksStatusContextProvider = ({ children }) => {
  const [tasksStatus, setTasksStatusState] = useState([]);

    tasksStatusAction = {
        addStatus: (item) => {
            setTasksStatusState([...tasksStatus, item])
        },
        removeStatus: (id) => {
            setTasksStatusState(tasksStatus =>tasksStatus.filter(item => item.id !== id));
        },
        setStatuses: (tasksStatusData) => {
            setTasksStatusState([...tasksStatusData]);
        }
    }

    return (
        <TasksStatusContext.Provider value={{tasksStatus}}>
            {children}
        </TasksStatusContext.Provider>
    );  
};

export { TasksStatusContextProvider, tasksStatusAction };
