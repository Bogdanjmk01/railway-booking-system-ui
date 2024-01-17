import ScheduleApi from "../api/scheduleApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteSchedule = () => {
    const { deleteScheduleById } = ScheduleApi();
    const { mutate, isPending } = useMutation({
        mutationFn: (id) => deleteScheduleById(id),
        onSuccess: (data) => {
            console.log(data);
            window.location.reload();
            toast.success("Schedule deleted successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while trying to delete the schedule");
        }
    });

    return { deleteSchedule: mutate, deleteIsPending: isPending };
};

export default useDeleteSchedule;