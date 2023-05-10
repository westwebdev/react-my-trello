import { useReducer, useState } from "react";
import TasksContext from "../context/tasksContext";

let tasksAction = null;

const TasksContextProvider = ({ children }) => {
  const [tasks, setTasksState] = useState([]);


    tasksAction = {
        addTask: (item) => {
            setTasksState({...tasks, ...item})
        },
        removeTask: (id) => {
            setTasksState(tasks =>tasks.filter(item => item.id !== id));
        },
        setTask: (tasksData) => {
            setTasksState({...tasksData});
        }
    }

    return (
        <TasksContext.Provider value={{tasks}}>
            {children}
        </TasksContext.Provider>
    );  
};

export { TasksContextProvider, tasksAction };
