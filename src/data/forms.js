import { colorsForTaskKind } from "./colors";

export const taskStatusForm = [
    {
        id: 'taskName',
        type: 'text',
        placeholder: '',
        label: 'Task kind name',
        required: true
    },
    {
        id: 'taskColor',
        type: 'select',
        placeholder: '',
        label: 'Task kind name',
        option: colorsForTaskKind,
        required: true
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
        required: true
    },
    {
        id: 'taskDescription',
        type: 'textarea',
        placeholder: 'Type description here',
        label: 'Task Description',
        required: true
    },
    {
        id: 'taskStatus',
        type: 'select',
        placeholder: '',
        label: 'Task Kind',
        required: true
    },
    {
        id: 'submitNewTaskForm',
        type: 'submit',
        label: 'Add',
    }
]