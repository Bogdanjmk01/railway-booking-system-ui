import StationApi from "../api/stationApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteStation = () => {
    const { deleteStation } = StationApi();
    const { mutate } = useMutation({
        mutationFn: (id) => deleteStation(id),
        onSuccess: (data) => {
            console.log(data);
            toast.success("Station deleted successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while deleting the station");
        }
    });

    return { deleteStation: mutate };
};

export default useDeleteStation;