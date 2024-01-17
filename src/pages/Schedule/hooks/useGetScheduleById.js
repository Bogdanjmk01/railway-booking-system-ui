import ScheduleApi from "../api/scheduleApi";
import { useQuery } from "@tanstack/react-query";

const useGetScheduleById = (id) => {
    const { getScheduleById } = ScheduleApi();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["schedule"],
        queryFn: () => getScheduleById(id)
    });

    if (isError) {
        console.log(isError);
        console.log(error);
    }

    const schedule = data?.data.schedule;
    console.log(schedule)

    return { schedule: schedule, isScheduleLoading: isLoading };
};

export default useGetScheduleById;