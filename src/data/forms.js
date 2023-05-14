import { colorsForTaskKind } from "./colors";

export const taskStatusForm = [
    {
        id: 'taskStatusName',
        type: 'text',
        placeholder: '',
        label: 'Task status name',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'taskStatusColor',
        type: 'select',
        placeholder: '',
        label: 'Task status color',
        option: colorsForTaskKind,
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'submitTaskStatusForm',
        type: 'submit',
        label: 'Add',
    }
]

export const taskColumnForm = [
    {
        ...taskStatusForm.find(({id}) => id === 'taskStatusName')
    },
    {
        ...taskStatusForm.find(({id}) => id === 'taskStatusColor')
    },
    {
        id: 'taskIds',
        type: 'select',
        placeholder: '',
        label: 'Choose target tasks',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        ...taskStatusForm.find(({id}) => id === 'submitTaskStatusForm'),
        label: 'Add Column',
    }
]

export const newTaskForm = [
    {
        id: 'taskSubject',
        type: 'text',
        placeholder: '',
        label: 'Task Subject',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'taskDescription',
        type: 'textarea',
        placeholder: 'Type description here',
        label: 'Task Description',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'submitNewTaskForm',
        type: 'submit',
        label: 'Add',
    }
]

export const newBoardForm = [
    {
        id: 'boardName',
        type: 'text',
        placeholder: '',
        label: 'Board Name',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'submitNewBoardForm',
        type: 'submit',
        label: 'Add',
    }
]

export const loginForm = [
    {
        id: 'login',
        type: 'text',
        placeholder: '',
        label: 'Login',
        required: true,
        events: ['onBlur']
    },
    {
        id: 'loginPass',
        type: 'password',
        placeholder: '',
        label: 'Password',
        required: true,
        events: ['onBlur']
    },
    {
        id: 'submitLogin',
        type: 'submit',
        label: 'Submit',
    }
]
