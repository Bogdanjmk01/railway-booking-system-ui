import { useForm } from "react-hook-form";
import useCreateStation from "./hooks/useCreateStation";

const StationForm = () => {
    const { mutate, isPending } = useCreateStation();
    const { register, setValue, handleSubmit, formState: { isValid } } = useForm({ mode: "onTouched" });

    const handleAddStation = async (data) => {
        await mutate(data);
    };

    const handleReset = () => {
        setValue("stationName", "");
        setValue("location", "");
    };

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Add a Station</h3>
                        <form onSubmit={handleSubmit(handleAddStation)} className="row g-3 mt-3">
                            <div className="col-md-12">
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Station Name"
                                           {...register("stationName", {
                                               required: {value: true, message: "Station name is required"},
                                               minLength: { value: 3, message: "Station name must be at least 3 characters long" }
                                           })} />
                                    <label htmlFor="floatingName">Station Name</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingName"
                                           placeholder="Location"
                                           {...register("location", {
                                               required: {value: true, message: "Location is required"},
                                               minLength: { value: 3, message: "Location type must be at least 3 characters long" }
                                           })}
                                    />
                                    <label htmlFor="floatingName">Location</label>
                                </div>
                            </div>
                            <div className="flex text-center">
                                <button disabled={!isValid} type="submit" className="btn btn-outline-primary">{isPending ? 'Creating station...' : 'Submit'}</button>
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

export default StationForm;
