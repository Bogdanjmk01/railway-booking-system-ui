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

    const exportToCsv = async () => {
        try {
            await axiosPrivate({
                url: '/user/seats/export/csv',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'seats.csv');
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
                url: '/user/seats/export/pdf',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'seats.pdf');
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

    return { getAllSeats, createSeat, getSeatById, updateSeat, exportToCsv, exportToPdf };
};

export default SeatApi;