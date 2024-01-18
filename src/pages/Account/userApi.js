import useAxiosPrivate from "../../apiClient/hooks/useAxiosPrivate";

const UserApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getProfile = async () => {
        try {
            const response = await axiosPrivate.get("/user/profile");
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getProfile };
};

export default UserApi;