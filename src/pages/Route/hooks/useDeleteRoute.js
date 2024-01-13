import RouteApi from "../api/routeApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteRoute = () => {
    const { deleteRouteById } = RouteApi();
    const { mutate, isPending } = useMutation({
        mutationFn: (id) => deleteRouteById(id),
        onSuccess: (data) => {
            console.log(data);
            toast.success("Route deleted successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while deleting the route");
        }
    });

    return { mutate, isPending };
};

export default useDeleteRoute;