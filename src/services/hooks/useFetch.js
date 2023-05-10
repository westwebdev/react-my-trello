import { useState } from 'react';

const queryUrl = (apiAction) => {
    const apiUrl = 'http://localhost:3001/';

    return `${apiUrl}${apiAction}`;
}

const fetchData = async ({method, apiAction, apiParams, setData, setIsLoading, setIsError, setErrorMsg}) => {
    if (apiAction) {
        const serverUrl = queryUrl(apiAction);
        let time = 0;

        try {
            let response;

            if (apiParams) {
                response = await fetch(serverUrl, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: method,
                    body: JSON.stringify(apiParams)
                });
                time = 1000;
            } else {
                response = await fetch(serverUrl);
            }

            const json = await response.json();

            setTimeout(() => {
                setData(json.data);
                setIsError(!json.success);
                setIsLoading(false);
                setErrorMsg(json.errMsg)
            }, time)
        } catch (error) {
            setTimeout(() => {
                setIsError(true);
                setIsLoading(false);
            }, time)
        }
    }
};

function useFetch(apiAction, apiParams) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const stateSetters = {
        setData,
        setIsLoading,
        setIsError,
        setErrorMsg
    }

    const getData = (apiAction) => {
        fetchData({
            method: 'GET',
            apiAction,
            apiParams,
            ...stateSetters
        });
    }

    const addData = (apiAction, apiParams) => {
        fetchData({
            method: 'POST',
            apiAction,
            apiParams,
            ...stateSetters
        });
    }

    const updateData = (apiAction, apiParams) => {
        fetchData({
            method: 'PUT',
            apiAction,
            apiParams,
            ...stateSetters
        });
    }

    const removeData = (apiAction, apiParams) => {
        fetchData({
            method: 'DELETE',
            apiAction,
            apiParams,
            ...stateSetters
        });
    }

    return { data, isLoading, isError, errorMsg, getData, addData, updateData, removeData};
}

export default useFetch;
