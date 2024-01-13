import { useQuery } from "@tanstack/react-query";
import SeatApi from "../api/seatApi";

const useGetAllSeats = (id) => {
    const { getAllSeats } = SeatApi();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["seats", id],
        queryFn: () => getAllSeats(id)
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { seats: data?.data.seats, seatsAreLoading: isLoading };
};

export default useGetAllSeats;