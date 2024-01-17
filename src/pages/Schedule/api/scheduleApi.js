import useAxiosPrivate from "../../../apiClient/hooks/useAxiosPrivate";

const ScheduleApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getAllSchedules = async () => {
        try {
            const response = await axiosPrivate.get("/user/schedules");
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const createSchedule = async (data) => {
        try {
            const response = await axiosPrivate.post("/user/create/schedule", data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getScheduleById = async (id) => {
        try {
            const response = await axiosPrivate.get(`/user/schedules/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateScheduleById = async (data, id) => {
       const params = { id: id };
       try {
           const response = await axiosPrivate.put("/user/update/schedule", data, { params });
           console.log(response);
           return response.data;
       }  catch (error) {
           console.log(error);
           throw error;
       }
    };

    const deleteScheduleById = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/user/delete/schedule//${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getAllSchedules, createSchedule, getScheduleById, updateScheduleById, deleteScheduleById };
};

export default ScheduleApi;