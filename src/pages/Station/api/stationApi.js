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

    const exportToCsv = async () => {
        try {
            await axiosPrivate({
                url: '/user/stations/export/csv',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'stations.csv');
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
                url: '/user/stations/export/pdf',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'stations.pdf');
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

    return { getAllStations, createStation, getStationById, deleteStation, exportToCsv, exportToPdf };
};

export default StationApi;