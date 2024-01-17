import ScheduleApi from "../api/scheduleApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCreateSchedule = () => {
    const { createSchedule } = ScheduleApi();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: (data) => createSchedule(data),
        onSuccess: (data) => {
            console.log(data);
            navigate("/schedules");
            toast.success("Schedule created successfully");
        },
        onError: (data) => {
            console.log(data);
            toast.error("An error has occurred while creating the schedule");
        }
    });

    return { mutate, isPending };
};

export default useCreateSchedule;