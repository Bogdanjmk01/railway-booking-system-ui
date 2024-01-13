import StationApi from "../api/stationApi";
import { useQuery } from "@tanstack/react-query";

const useGetAllStations = () => {
    const { getAllStations } = StationApi();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["stations"],
        queryFn: () => getAllStations()
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { stations: data?.data.stations, isLoading };
};

export default useGetAllStations;