import SeatApi from "../api/seatApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCreateSeat = () => {
    const { createSeat } = SeatApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (data) => createSeat(data),
        onSuccess: (data) => {
            console.log(data);
            navigate("/seats");
            toast.success("Seat created successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while creating a seat");
        }
    });

    return { mutate, isPending };
};

export default useCreateSeat;