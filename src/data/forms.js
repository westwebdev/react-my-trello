import { colorsForTaskKind } from "./colors";

export const taskStatusForm = [
    {
        id: 'taskName',
        type: 'text',
        placeholder: '',
        label: 'Task kind name',
    },
    {
        id: 'taskColor',
        type: 'select',
        placeholder: '',
        label: 'Task kind name',
        option: colorsForTaskKind
    },
    {
        id: 'submitTaskStatusForm',
        type: 'submit',
        label: 'Add',
    }
]