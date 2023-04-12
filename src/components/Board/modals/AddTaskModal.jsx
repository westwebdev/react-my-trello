import React, { useContext, useEffect, useState } from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

import TasksContext from '../../../context/tasksContext';
import { newTaskForm } from '../../../data/forms';
import formRender from '../../../utils/formRender';
import { fieldValidation, formValidation } from '../../../utils/formValidation';
import { extendFormData, getFormDataByFieldId, splitFormToBodyAndFooter } from '../../../utils/formUtils';

const AddTaskModal = ({onModalClose}) => {
    const {tasksStatus} = useContext(TasksContext);
    const {tasks, setTasks} = useContext(TasksContext);
    const [newTaskFormData, setNewTaskFormData] = useState(newTaskForm);

    let newTaskFormBody = splitFormToBodyAndFooter(newTaskFormData).body;
    const newTaskFormFooter = splitFormToBodyAndFooter(newTaskFormData).footer;

    newTaskFormBody.map(item => {
        if (item.id === 'taskStatus') {
            item.option = tasksStatus.map(item => {
                return {
                    id: item.id,
                    value: item.id,
                    name: item.title
                }
            });
        }
        return true;
    });

    const onSubmitForm = (e) => {
        e.preventDefault();

        const {form, isValid} = formValidation(newTaskFormData);

        if (isValid) {
            setTasks([
                ...tasks,
                {
                    id: Date.now(),
                    title: getFormDataByFieldId(form, 'taskSubject'),
                    text: getFormDataByFieldId(form, 'taskDescription'),
                    status: getFormDataByFieldId(form, 'taskStatus')
                }
            ]);
            onModalClose();
        } else {
            setNewTaskFormData([
                ...form,
            ]);
        }
    }

    const changeHandler = (e, item) => {
        extendFormData(e, item, newTaskFormBody, newTaskFormFooter, setNewTaskFormData);
    }

    useEffect(() => {
        console.log(1111111111);
    }, [newTaskFormData]);

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add task</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmitForm}>
                    <ModalBody>
                        {
                            formRender(
                                newTaskFormBody,
                                newTaskFormData,
                                changeHandler
                            )
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            formRender(newTaskFormFooter)
                        }
                    </ModalFooter>
                </form>
            </ModalContent>
        </>
    );
}

export default AddTaskModal;