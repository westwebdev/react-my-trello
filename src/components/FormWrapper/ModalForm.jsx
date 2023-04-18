import { ModalBody, ModalFooter } from '@chakra-ui/react';
import React from 'react';

const ModalForm = ({submitHandler, formComponent}) => {
    return (
        <form onSubmit={submitHandler}>
            <ModalBody>
                {
                    formComponent[0]
                }
            </ModalBody>
            {
                formComponent.length > 1
                ?
                <ModalFooter>
                    {
                        formComponent[1]
                    }
                </ModalFooter>
                :
                <></>
            }
        </form>
    );
}

export default ModalForm;