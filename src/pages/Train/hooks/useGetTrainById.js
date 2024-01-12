import { useQuery } from "@tanstack/react-query";
import TrainApi from "../api/trainApi";

const useGetTrainById = (id) => {
    const { getTrainById } = TrainApi();
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => getTrainById(id),
        queryKey: ["train"]
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { train: data?.data.train, isLoading };
};

export default useGetTrainById;