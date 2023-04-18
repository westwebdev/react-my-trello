import React from 'react';

const PageForm = ({submitHandler, formComponent}) => {
    return (
        <form onSubmit={submitHandler} noValidate>
            {
                formComponent[0]
            }
            {
                formComponent.length > 1
                ?
                    formComponent[1]
                :
                    <></>
            }
        </form>
    );
}

export default PageForm;