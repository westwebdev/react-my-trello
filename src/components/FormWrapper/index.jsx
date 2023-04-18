import React from 'react';
import ModalForm from './ModalForm';
import PageForm from './PageForm';

// const FormWrapper = ({isModalForm, submitHandler, formBodyComponent, formFooterComponent}) => {
const FormWrapper = ({isModalForm, submitHandler, formComponent}) => {
    // const formC
    // if (isSeparateFooter) {

    // }
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