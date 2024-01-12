import { useEffect } from "react";
import useAddTrain from "./hooks/useAddTrain";
import { useForm } from "react-hook-form";
import useGetTrainById from "./hooks/useGetTrainById";
import { useParams } from "react-router-dom";
import useUpdateTrain from "./hooks/useUpdateTrain";

const TrainForm = () => {
    const params = useParams();
    const { mutate, isPending } = useAddTrain();
    const { train, isLoading } = useGetTrainById(params.trainId);
    const { updateATrain, pendingUpdate } = useUpdateTrain();
    const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({ mode: "onTouched" });

    const handleAddTrain = async (data) => {
        await mutate(data);
    };

    const handleUpdateTrain = async (data) => {
        await updateATrain({ data, id: params.trainId });
    };

    const populateForm = () => {
        if (train) {
            setValue("name", train.name);
            setValue("type", train.type);
        }
    };

    useEffect(() => {
        populateForm();
    }, [train]);

    const handleReset = () => {
        setValue("name", "");
        setValue("type", "");
    };

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Add a Train</h3>
                        <form onSubmit={train ? handleSubmit(handleUpdateTrain) : handleSubmit(handleAddTrain)} className="row g-3 mt-3">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Train Name"
                                       {...register("name", {
                                           required: { value: true, message: "Train name is required" },
                                           minLength: { value: 3, message: "Train name must be at least 3 characters long" }})} />
                                    <label htmlFor="floatingName">Your Name</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Train Type"
                                       {...register("type", {
                                           required: { value: true, message: "Train type is required" },
                                           minLength: { value: 3, message: "Train type must be at least 3 characters long" }})}
                                    />
                                    <label htmlFor="floatingName">Your Name</label>
                                </div>
                            </div>
                            <div className="flex text-center">
                                <button disabled={errors || !isValid || pendingUpdate} type="submit" className="btn btn-outline-primary">{isPending ? 'Creating train...' : 'Submit'}</button>
                                &nbsp;
                                <button type="reset" onClick={handleReset} className="btn btn-outline-secondary">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default TrainForm
