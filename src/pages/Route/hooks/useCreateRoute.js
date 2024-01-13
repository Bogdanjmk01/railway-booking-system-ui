import RouteApi from "../api/routeApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCreateRoute = () => {
    const { createRoute } = RouteApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (data) => createRoute(data),
        onSuccess: (data) => {
            console.log(data);
            navigate("/routes");
            toast.success("Route created successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while creating the route");
        }
    });

    return { mutate, isPending };
};

export default useCreateRoute;