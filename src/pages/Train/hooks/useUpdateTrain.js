import TrainApi from "../api/trainApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useUpdateTrain = () => {
    const { updateTrain } = TrainApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationKey: 'updateTrain',
        mutationFn: ({ data, id }) => updateTrain(data, id),
        onSuccess: (data) => {
            console.log(data);
            navigate("/trains");
            toast.info("Train updated successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred");
        }
    });

    return { updateATrain: mutate, pendingUpdate: isPending };
};

export default useUpdateTrain;