import { useState, useEffect } from "react";
import useCreateRoute from "./hooks/useCreateRoute";
import useGetAllStations from "../Station/hooks/useGetAllStations";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useGetRouteById from "./hooks/useGetRouteById";
import useUpdateRoute from "./hooks/useUpdateRoute";

const RouteForm = () => {
    const params = useParams();
    const { mutate, isPending } = useCreateRoute();
    const { stations, isLoading } = useGetAllStations();
    const { register, setValue, handleSubmit, formState: { isValid } } = useForm({ mode: "onTouched" });
    const { route, routeIsLoading } = useGetRouteById(params.routeId);
    const [departureStation, setDepartureStation] = useState();
    const [arrivalStation, setArrivalStation] = useState();
    const [timestamp, setTimestamp] = useState();
    const { updateRoute, isUpdating } = useUpdateRoute();

    const handleCreateRoute = async (data) => {
        const requestBody = { ...data, departureStationId: departureStation, arrivalStationId: arrivalStation, arrivalTime: timestamp };
        await mutate(requestBody);
    };

    const handleReset = () => {
        if (route) {
            setValue("distance", route.distance);
            setDepartureStation(route.departureStationId);
            setArrivalStation(route.arrivalStationId);
            setTimestamp(route.arrivalTime);
        } else {
            setDepartureStation("");
            setArrivalStation("");
            setValue("distance", "");
            setValue("arrivalTime", "");
        }
    };

    const populateForm = () => {
        if (route) {
            setValue("distance", route.distance);
            setDepartureStation(route.departureStationId);
            setArrivalStation(route.arrivalStationId);
            setTimestamp(route.arrivalTime);
        }
    };

    useEffect(() => {
        populateForm();
    }, [route, setValue]);

    const handleUpdateRoute = async (data) => {
        const requestBody = { ...data, arrivalStationId: arrivalStation, departureStationId: departureStation, arrivalTime: timestamp };
        console.log(requestBody);
        updateRoute({ data: requestBody, id: params.routeId });
    };

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <div className="card">
                    <div className="card-body">
                        <h3>Add a Route</h3>
                        <form onSubmit={route ? handleSubmit(handleUpdateRoute) : handleSubmit(handleCreateRoute)} className="row g-3 mt-3">
                            <div className="col-md-12">
                                <div className="form-floating mt-4">
                                    {route && !routeIsLoading ? (
                                        <select value={departureStation || ""} onChange={(e) => setDepartureStation(e.target.value)}>
                                            <option value="" disabled>Select Departure Station</option>
                                            {stations.map((station) => (
                                                <option key={station.id} value={station.id}>{station.stationName}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        !isLoading && (
                                            <select value={departureStation || ""} onChange={(e) => setDepartureStation(e.target.value)}>
                                                <option value="" disabled>Select Departure Station</option>
                                                {stations.map((station) => (
                                                    <option key={station.id} value={station.id}>{station.stationName}</option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                    <label htmlFor="floatingName">Departure Station</label>
                                </div>
                                <div className="form-floating mt-4">
                                    {route && !routeIsLoading ? (
                                        <select value={arrivalStation || ""} onChange={(e) => setArrivalStation(e.target.value)}>
                                            <option value="" disabled>Select Arrival Station</option>
                                            {stations.map((station) => (
                                                <option key={station.id} value={station.id}>{station.stationName}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        !isLoading && (
                                            <select value={arrivalStation || ""} onChange={(e) => setArrivalStation(e.target.value)}>
                                                <option value="" disabled>Select Arrival Station</option>
                                                {stations.map((station) => (
                                                    <option key={station.id} value={station.id}>{station.stationName}</option>
                                                ))}
                                            </select>
                                        )
                                    )}
                                    <label htmlFor="floatingName">Arrival Station</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="number" className="form-control" id="floatingName" placeholder="Distance"
                                           {...register("distance", {
                                               required: {value: true, message: "Distance type is required"}
                                           })}
                                    />
                                    <label htmlFor="floatingName">Distance [km]</label>
                                </div>
                                <div className="form-floating mt-4">
                                    <input type="text" className="form-control" id="floatingTimestamp"
                                        placeholder="Timestamp"
                                        value={timestamp}
                                        onChange={(e) => setTimestamp(e.target.value)}
                                    />
                                    <label htmlFor="floatingName">Arrival Time</label>
                                </div>
                            </div>
                            <div className="flex text-center">
                                <button type="submit" disabled={isUpdating} className="btn btn-outline-primary">{isPending ? 'Creating seat...' : 'Submit'}</button>
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

export default RouteForm;
