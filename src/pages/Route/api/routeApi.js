import useAxiosPrivate from "../../../apiClient/hooks/useAxiosPrivate";

const RouteApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getAllRoutes = async () => {
        try {
            const response = await axiosPrivate.get("/user/routes");
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const createRoute = async (data) => {
        try {
            const response = await axiosPrivate.post("/user/create/route", data);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const getRouteById = async (id) => {
        try {
            const response = await axiosPrivate.get(`/user/routes/${id}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const updateRoute = async (data, id) => {
        const params = { id: id };
        try {
            const response = await axiosPrivate.put("/user/update/route", data, { params });
            console.log(response);
            return response.data;
        }  catch (error) {
            console.log(error);
            throw error;
        }
    };

    const deleteRouteById = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/user/delete/${id}`);
            console.log(response);
            return response.data;
        }  catch (error) {
            console.log(error);
            throw error;
        }
    };

    return { getAllRoutes, createRoute, getRouteById, updateRoute, deleteRouteById };
};

export default RouteApi;