import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useGetAllTrains from "../Train/hooks/useGetAllTrains";
import useGetSeatById from "./hooks/useGetSeatById";
import useCreateSeat from "./hooks/useCreateSeat";
import useUpdateSeat from "./hooks/useUpdateSeat";

const SeatForm = () => {
    const params = useParams();
    const { trains, isLoading } = useGetAllTrains();
    const { seat, seatIsLoading } = useGetSeatById(params.seatId);
    const { mutate, isPending } = useCreateSeat();
    const { updateSeat, seatIsUpdating } = useUpdateSeat();
    const { register, handleSubmit, setValue, formState: { isValid } } = useForm({ mode: "onTouched" });
    const [selectedTrainId, setSelectedTrainId] = useState();

    const handleAddSeat = async (data) => {
        await mutate({ ...data, trainId: selectedTrainId });
    };

    const handleUpdateSeat = async (data) => {
        const requestBody = { ...data, trainId: selectedTrainId };
        console.log(requestBody);
        await updateSeat({ data: requestBody, id: params.seatId });
    };

    const populateForm = () => {
        if (seat) {
            setValue("seatNumber", seat.seatNumber);
            setSelectedTrainId(seat.trainId);
            setValue("carNumber", seat.carNumber);
            setValue("className", seat.className);
        }
    };

    useEffect(() => {
        populateForm();
    }, [seat, setValue]);

    const handleReset = () => {
        setValue("seatNumber", "");
        setSelectedTrainId("");
        setValue("carNumber", "");
        setValue("className", "");
    };

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Add a Seat</h3>
                        <form onSubmit={seat ? handleSubmit(handleUpdateSeat) : handleSubmit(handleAddSeat)} className="row g-3 mt-3">
                            <div className="col-md-12">
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Seat Number"
                                           {...register("seatNumber", {
                                               required: { value: true, message: "Seat number is required" },
                                               minLength: { value: 3, message: "Seat number must be at least 3 characters long" }
                                           })}
                                    />
                                    <label htmlFor="floatingName">Seat Number</label>
                                </div>
                                <div className="form-floating mt-4">
                                    {seat && !seatIsLoading ? (
                                        <select className="form-select" value={selectedTrainId || ""} onChange={(e) => setSelectedTrainId(e.target.value)}>
                                            <option value="" disabled>Select Train</option>
                                            {trains.map((train) => (
                                                <option key={train.id} value={train.id}>{train.name}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        !isLoading && (
                                            <select className="form-select" value={selectedTrainId || ""} onChange={(e) => setSelectedTrainId(e.target.value)}>
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
                                    <input type="number" className="form-control" id="floatingName"
                                           placeholder="Car Number"
                                           {...register("carNumber", {
                                               required: {value: true, message: "Car number type is required"}
                                           })}
                                    />
                                    <label htmlFor="floatingName">Car Number</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingName"
                                           placeholder="Class Name"
                                           {...register("className", {
                                               required: {value: true, message: "Class is required"},
                                               minLength: { value: 3, message: "Class must be at least 3 characters long" }
                                           })}
                                    />
                                    <label htmlFor="floatingName">Class Name</label>
                                </div>
                            </div>
                            <div className="flex text-center">
                                <button disabled={seatIsUpdating} type="submit" className="btn btn-outline-primary">{isPending ? 'Creating seat...' : 'Submit'}</button>
                                &nbsp;
                                <button type="reset" onClick={handleReset} className="btn btn-outline-secondary">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default SeatForm;
