import { useQuery } from "@tanstack/react-query";
import TrainApi from "../api/trainApi";

const useGetAllTrains = () => {
    const { getAllTrains } = TrainApi();
    const { data, isLoading, isError, error } = useQuery({
       queryFn: () => getAllTrains(),
       queryKey: ["trains"]
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { trains: data?.data.trains, isLoading };
};

export default useGetAllTrains;