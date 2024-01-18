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
            toast.error('Emailul nu a putut fi trimis!', {
                style: { fontSize: '15px' },
                position: "bottom-left",
                autoClose: 2000,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'light'
            });
        }
    });

    return { mutate, isPending };
};

export default useDeleteRoute;