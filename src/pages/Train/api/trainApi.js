import useAxiosPrivate from "../../../apiClient/hooks/useAxiosPrivate";
import apiClient from "../../../apiClient/apiClient";

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

    const exportToCsv = async () => {
      try {
          await axiosPrivate({
              url: '/user/trains/export/csv',
              method: 'GET',
              responseType: 'blob',
          }).then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'trains.csv');
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
                url: '/user/trains/export/pdf',
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'trains.pdf');
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

    return { getAllTrains, addTrain, getTrainById, updateTrain, deleteTrain, exportToCsv, exportToPdf };
};

export default TrainApi;