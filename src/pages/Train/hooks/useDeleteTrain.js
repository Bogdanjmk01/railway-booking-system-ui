import TrainApi from "../api/trainApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteTrain = () => {
    const { deleteTrain } = TrainApi();
    const { mutate, isPending } = useMutation({
        mutationFn: (id) => deleteTrain(id),
        onSuccess: (data) => {
            console.log(data);
            toast.success("Train deleted successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while deleting the train");
        }
    });

    return { mutate, isPending };
};

export default useDeleteTrain;