import TrainApi from "../api/trainApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAddTrain = () => {
    const { addTrain } = TrainApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (data) => addTrain(data),
        onSuccess: (data) => {
            console.log(data);
            navigate("/trains");
            toast.success("Train created successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred");
        }
    });

    return { mutate, isPending };
};

export default useAddTrain;