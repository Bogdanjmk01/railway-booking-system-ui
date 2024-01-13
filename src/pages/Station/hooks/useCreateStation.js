import { useNavigate } from "react-router-dom";
import StationApi from "../api/stationApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useCreateStation = () => {
    const { createStation } = StationApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (data) => createStation(data),
        onSuccess: (data) => {
            console.log(data);
            navigate("/stations");
            toast.success("Station created successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while creating the station");
        }
    });

    return { mutate, isPending };
};

export default useCreateStation;