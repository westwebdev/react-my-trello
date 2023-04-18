import { colorsForTaskKind } from "./colors";

export const taskStatusForm = [
    {
        id: 'taskName',
        type: 'text',
        placeholder: '',
        label: 'Task kind name',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'taskColor',
        type: 'select',
        placeholder: '',
        label: 'Task kind name',
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
        id: 'taskStatus',
        type: 'select',
        placeholder: '',
        label: 'Task Kind',
        required: true,
        events: ['onBlur', 'onChange']
    },
    {
        id: 'submitNewTaskForm',
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
