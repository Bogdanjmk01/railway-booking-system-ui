import { useEffect } from "react";
import { axiosPrivate } from "../apiClient";

const useAxiosPrivate = () => {
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
          config => {
            const token = window.localStorage.getItem("access_token");
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
          }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
          axiosPrivate.interceptors.request.eject(requestIntercept);
          axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosPrivate;
};

export default useAxiosPrivate;