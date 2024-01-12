import apiClient from "../../apiClient/apiClient";

const login = async (data) => {
    try {
        const response = await apiClient.post("/auth/login", data);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default login;