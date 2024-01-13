import useAxiosPrivate from "../../../apiClient/hooks/useAxiosPrivate";

const StationApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getAllStations = async () => {
        try {
            const response = await axiosPrivate.get("/user/stations");
            console.log(response);
            return response.data;
        }  catch (error) {
            console.log(error);
            throw error;
        }
    };

    const createStation = async (data) => {
        try {
            const response = await axiosPrivate.post("/user/create/station", data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getStationById = async (id) => {
        try {
            const response = await axiosPrivate.get(`/user/stations/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const deleteStation = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/user/delete/station/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getAllStations, createStation, getStationById, deleteStation };
};

export default StationApi;