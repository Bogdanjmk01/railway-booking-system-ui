import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCreateSchedule from "./hooks/useCreateSchedule";
import useGetAllRoutes from "../Route/hooks/useGetAllRoutes";
import useGetAllTrains from "../Train/hooks/useGetAllTrains";
import useGetScheduleById from "./hooks/useGetScheduleById";
import useUpdateSchedule from "./hooks/useUpdateSchedule";
import { useForm } from "react-hook-form";

const ScheduleForm = () => {
    const params = useParams();
    const { mutate, isPending } = useCreateSchedule();
    const { routes, isLoading } = useGetAllRoutes();
    const { trains, isLoading: isTrainsLoading } = useGetAllTrains();
    const { register, setValue, handleSubmit, formState: { isValid } } = useForm({ mode: "onTouched" });
    const { schedule, isScheduleLoading } = useGetScheduleById(params.scheduleId);
    const [train, setTrain] = useState();
    const [route, setRoute] = useState();
    const { updateSchedule, isPendingUpdate } = useUpdateSchedule();

    const handleCreateSchedule = async (data) => {
        const requestBody = { ...data, trainId: train, routeId: route };
        await mutate(requestBody);
    };

    const handleReset = () => {
        if (schedule) {
            setValue("departureTime", schedule.departureTime);
            setValue("arrivalTime", schedule.arrivalTime);
            setTrain(schedule.trainId);
            setRoute(schedule.routeId);
        } else {
            setValue("departureTime", "");
            setValue("arrivalTime", "");
            setTrain("");
            setRoute("");
        }
    };

    const populateForm = () => {
        if (schedule) {
            setValue("departureTime", schedule.departureTime);
            setValue("arrivalTime", schedule.arrivalTime);
            setTrain(schedule.trainId);
            setRoute(schedule.routeId);
        }
    };

    useEffect(() => {
        populateForm();
    }, [schedule, setValue]);

    const handleUpdateSchedule = async (data) => {
        const requestBody = { ...data, trainId: train, routeId: route };
        console.log(requestBody);
        updateSchedule({ data: requestBody, id: params.scheduleId });
    };

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Add a Schedule</h3>
                        <form onSubmit={schedule ? handleSubmit(handleUpdateSchedule) : handleSubmit(handleCreateSchedule)} className="row g-3 mt-3">
                            <div className="col-md-12">
                                <div className="form-floating mt-4">
                                    {schedule && !isScheduleLoading ? (
                                        <select className="form-select" value={train || ""} onChange={(e) => setTrain(e.target.value)}>
                                            <option value="" disabled>Select Train</option>
                                            {trains.map((train) => (
                                                <option key={train.id} value={train.id}>{train.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        !isTrainsLoading && (
                                            <select className="form-select" value={train || ""} onChange={(e) => setTrain(e.target.value)}>
                                                <option value="" disabled>Select Train</option>
                                                {trains.map((train) => (
                                                    <option key={train.id} value={train.id}>{train.name}</option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                    <label htmlFor="floatingName">Train</label>
                                </div>
                                <div className="form-floating mt-4">
                                    {schedule && !isScheduleLoading ? (
                                        <select className="form-select" value={route || ""} onChange={(e) => setRoute(e.target.value)}>
                                            <option value="" disabled>Select Route</option>
                                            {routes.map((station) => (
                                                <option key={station.id} value={station.id}>{station.id}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        !isLoading && (
                                            <select className="form-select" value={route || ""} onChange={(e) => setRoute(e.target.value)}>
                                                <option value="" disabled>Select Route</option>
                                                {routes.map((route) => (
                                                    <option key={route.id} value={route.id}>{route.id}</option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                    <label htmlFor="floatingName">Route</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Departure Time"
                                           {...register("departureTime", {
                                               required: {value: true, message: "Departure Time is required"}
                                           })}
                                    />
                                    <label htmlFor="floatingName">Departure Time</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingName"
                                           placeholder="Arrival Time"
                                           {...register("arrivalTime", {
                                               required: {value: true, message: "Arrival Time is required"}
                                           })}
                                    />
                                    <label htmlFor="floatingName">Arrival Time</label>
                                </div>
                            </div>
                            <div className="flex text-center">
                                <button type="submit" disabled={isPendingUpdate} className="btn btn-outline-primary">{isPending ? 'Creating schedule...' : 'Submit'}</button>
                                &nbsp;
                                <button type="reset" onClick={handleReset} className="btn btn-outline-secondary">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ScheduleForm;
