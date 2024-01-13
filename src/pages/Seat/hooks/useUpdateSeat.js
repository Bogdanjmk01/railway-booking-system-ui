import { useNavigate } from "react-router-dom";
import SeatApi from "../api/seatApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useUpdateSeat = () => {
    const { updateSeat } = SeatApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: ({ data, id }) =>  updateSeat(data, id),
        onSuccess: (data) => {
            console.log(data);
            navigate("/seats");
            toast.info("Seat updated successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while updating the seat");
        }
    });

    return { updateSeat: mutate, seatIsUpdating: isPending };
};

export default useUpdateSeat;