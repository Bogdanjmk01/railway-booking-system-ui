import useAxiosPrivate from "../../../apiClient/hooks/useAxiosPrivate";

const SeatApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getAllSeats = async (id) => {
        const params = { trainId: id };
        try {
            const response = await axiosPrivate.get("/user/seats", { params });
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const createSeat = async (data) => {
        try {
            const response = await axiosPrivate.post("/user/create/seat", data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getSeatById = async (id) => {
        try {
            const response = await axiosPrivate.get(`/user/seats/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateSeat = async (data, id) => {
        const params = { id: id };
        try {
            const response = await axiosPrivate.put("/user/update/seat", data, { params });
            console.log(response);
            return response.data;
        }  catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getAllSeats, createSeat, getSeatById, updateSeat };
};

export default SeatApi;