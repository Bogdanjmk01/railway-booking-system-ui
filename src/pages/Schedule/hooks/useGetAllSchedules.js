import ScheduleApi from "../api/scheduleApi";
import { useQuery } from "@tanstack/react-query";

const useGetAllSchedules = () => {
    const { getAllSchedules } = ScheduleApi();
    const { data, isLoading, isError, error } = useQuery({
        queryFn: () => getAllSchedules(),
        queryKey: ["schedules"]
    });

    if (isError) {
        console.log(error);
        console.log(isError);
    }

    return { data, isLoading };
};

export default useGetAllSchedules;