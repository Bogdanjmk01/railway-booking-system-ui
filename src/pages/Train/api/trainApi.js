import useAxiosPrivate from "../../../apiClient/hooks/useAxiosPrivate";

const TrainApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getAllTrains = async () => {
        try {
            const response = await axiosPrivate.get("/user/trains");
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const addTrain = async (data) => {
        try {
            const response = await axiosPrivate.post("/user/create/train", data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getTrainById = async (id) => {
        try {
            const response = await axiosPrivate.get(`/user/trains/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateTrain = async (data, id) => {
        const params = { id: id };
        try {
            const response = await axiosPrivate.put("/user/update/train", data, { params });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const deleteTrain = async (trainId) => {
        try {
            const response = await axiosPrivate.delete(`/user/delete/train/${trainId}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getAllTrains, addTrain, getTrainById, updateTrain, deleteTrain };
};

export default TrainApi;