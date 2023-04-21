import React, { useContext, useEffect, useState } from 'react';

import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from '@chakra-ui/react';

import TasksContext from '../../../context/tasksContext';
import { taskColumnForm, taskStatusForm } from '../../../data/forms';
import formComponentRender from '../../../components/Forms/formComponentRender';
import { extendFormData, getFormDataByFieldId } from '../../../utils/formUtils';
import { clearValidationErrors, formValidation } from '../../../utils/formValidation';
import FormWrapper from '../../../components/Forms/FormWrapper';

const AddStatusModal = ({onModalClose, isCreateCol}) => {
    const taskStatusOrColumnForm = isCreateCol ? taskColumnForm : taskStatusForm;
    const {tasks, setTasks, tasksStatusState, setTasksStatusState} = useContext(TasksContext);
    const [formData, setFormData] = useState(taskStatusOrColumnForm);

    if (isCreateCol) {
        formData.map(item => {
            if (item.id === 'taskIds') {
                item.option = tasks.map(item => {
                    return {
                        id: item.id,
                        value: item.id,
                        name: `${item.title} (id: ${item.id})`
                    }
                });
            }
            return true;
        });
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        const {validatedForm, isValid} = formValidation([...formData]);

        if (isValid) {
            const newTaskStatus = {
                id: `taskStatusName_${Date.now()}`,
                title: getFormDataByFieldId(validatedForm, 'taskStatusName'),
                color: getFormDataByFieldId(validatedForm, 'taskStatusColor')
            }

            setTasksStatusState([
                ...tasksStatusState,
                newTaskStatus
            ]);

            if (isCreateCol) {
                const taskId = Number(validatedForm.find(item => item.id === "taskIds").value);
                const unchangedTasks = tasks.filter(({id}) => id !== taskId);
                const changedTask = tasks.find(item => 
                        item.id === taskId
                        &&
                        (item.status = newTaskStatus.id)
                    );

                setTasks([
                    ...unchangedTasks,
                    {...changedTask}
                ]);
            }

            onModalClose();
        } else {
            setFormData([
                ...validatedForm
            ])
        }
    }

    const blurHandler = (e, item) => {
        extendFormData(e, item, formData, setFormData);
    }

    const eventsHandler = {
        onBlur: (e, item) => blurHandler(e, item)
    }

    useEffect(() => {
        return () => {
            clearValidationErrors([...formData]);
        }
    });

    return (
        <>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add new {isCreateCol ? 'column' : 'kind of status' }</ModalHeader>
                <ModalCloseButton />
                <FormWrapper
                    isModalForm={true}
                    submitHandler={onSubmitForm}
                    formComponent={
                        formComponentRender({
                            formObject: formData,
                            eventsHandler,
                            options: {isSeparateFooter: true}
                        })
                    }
                />
            </ModalContent>
        </>
    );
}

export default AddStatusModal;
