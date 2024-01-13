import SeatApi from "../api/seatApi";
import { useQuery } from "@tanstack/react-query";

const useGetSeatById = (id) => {
    const { getSeatById } = SeatApi();
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => getSeatById(id),
        queryKey: ["seat"]
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { seat: data?.data.seat, seatIsLoading: isLoading };
};

export default useGetSeatById;