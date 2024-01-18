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
            console.log(data);
            const response = await axiosPrivate.post("/user/create/schedule", data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getScheduleById = async (id) => {
        console.log(id)
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
            const response = await axiosPrivate.delete(`/user/delete/schedule/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const exportToCsv = async () => {
        try {
            await axiosPrivate({
                url: '/user/schedules/export/csv',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'schedules.csv');
                document.body.appendChild(link);
                link.click();
            }).catch((error) => {
                console.error('Error downloading the file:', error);
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const exportToPdf = async () => {
        try {
            await axiosPrivate({
                url: '/user/schedules/export/pdf',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'schedules.pdf');
                document.body.appendChild(link);
                link.click();
            }).catch((error) => {
                console.error('Error downloading the file:', error);
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getAllSchedules, createSchedule, getScheduleById, updateScheduleById, deleteScheduleById, exportToCsv, exportToPdf };
};

export default ScheduleApi;