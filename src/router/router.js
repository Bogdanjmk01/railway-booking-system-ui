import { Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login/Login";
import { Layout } from "../pages/layout";
import TrainList from "../pages/Train";
import TrainForm from "../pages/Train/TrainForm";

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
                </Route>
            </Route>
        </Routes>
    )
};

export default AppRoutes;
