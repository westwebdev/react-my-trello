import React from 'react';
import ModalForm from './ModalForm';
import PageForm from './PageForm';

const FormWrapper = ({isModalForm, submitHandler, formComponent}) => {
    return (
        <>
            {
                isModalForm
                ?
                <ModalForm
                    submitHandler={submitHandler}
                    formComponent={formComponent}
                />
                :
                <PageForm
                    submitHandler={submitHandler}
                    formComponent={formComponent}
                />
            }
        </>
    );
}

export default FormWrapper;
