import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import { Layout } from "../pages/layout";
import TrainList from "../pages/Train";
import TrainForm from "../pages/Train/TrainForm";
import SeatList from "../pages/Seat";
import SeatForm from "../pages/Seat/SeatForm";
import StationList from "../pages/Station";
import StationForm from "../pages/Station/StationForm";
import RouteList from "../pages/Route";
import RouteForm from "../pages/Route/RouteForm";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Layout />}>
                    <Route path="/trains" element={<TrainList />} />
                    <Route path="/create/train" element={<TrainForm />} />
                    <Route path="/update/train/:trainId" element={<TrainForm />} />

                    <Route path="/seats" element={<SeatList />} />
                    <Route path="/create/seat" element={<SeatForm />} />
                    <Route path="/update/seat/:seatId" element={<SeatForm />} />

                    <Route path="/stations" element={<StationList />} />
                    <Route path="/create/station" element={<StationForm />} />

                    <Route path="/routes" element={<RouteList />} />
                    <Route path="/create/route" element={<RouteForm />} />
                    <Route path="/update/route/:routeId" element={<RouteForm />} />
                </Route>
            </Route>
        </Routes>
    )
};

export default AppRoutes;
