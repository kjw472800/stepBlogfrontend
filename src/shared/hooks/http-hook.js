import { useState, useCallback, useRef, useEffect } from 'react';


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    /// if we do not want to change UI when change this data, so we do view this as state, so we use useRef
    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);
            
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    ///link request to httpAborCtrl and can cancel this request by call AbortCtrl
                    signal: httpAbortCtrl.signal
                });
                const responseData = await response.json();
                activeHttpRequests.current = activeHttpRequests.current.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);
                setIsLoading(false);
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                return responseData;
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
                throw (error);
            }
        }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, [])

    useEffect(() => {
        /// run as cleanup function before rerender or unmount
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, []);
    return { isLoading, error, sendRequest, clearError };
}