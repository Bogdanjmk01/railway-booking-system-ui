import ScheduleApi from "../api/scheduleApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useUpdateSchedule = () => {
    const { updateScheduleById } = ScheduleApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: ({ data, id }) => updateScheduleById(data, id),
        onSuccess: (data) => {
            console.log(data);
            navigate("/schedules");
            toast.success("Schedule updated successfully")
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while updating the schedule");
        }
    });

    return { updateSchedule: mutate, isPendingUpdate: isPending };
};

export default useUpdateSchedule;