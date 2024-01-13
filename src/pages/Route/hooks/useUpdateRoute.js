import RouteApi from "../api/routeApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUpdateRoute = () => {
    const { updateRoute } = RouteApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: ({ data, id }) => updateRoute(data, id),
        onSuccess: (data) => {
            console.log(data);
            navigate("/routes");
            toast.info("Route update successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while updating the route");
        }
    });

    return { updateRoute: mutate, isUpdating: isPending };
};

export default useUpdateRoute;