import { useNavigate } from "react-router-dom";
import "../styles/remixicon/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../index.css";
import { LiaTrainSolid } from "react-icons/lia";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { MdTransferWithinAStation } from "react-icons/md";
import { LiaRouteSolid } from "react-icons/lia";
import { GrSchedules } from "react-icons/gr";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { toast } from "react-toastify";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        window.localStorage.clear();
        navigate("/login");
        toast.success("Logged out successfully");
    };

    return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
                <div className="container-fluid">
                    <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-user d-lg-none">
                        <div className="dropdown">
                            <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                                <a href="/trains" className="dropdown-item">Trains</a>
                                <a href="/seats" className="dropdown-item">Seats</a>
                                <a href="/stations" className="dropdown-item">Stations</a>
                                <a href="/routes" className="dropdown-item">Routes</a>
                                <a href="/schedules" className="dropdown-item">Schedules</a>
                                <hr className="dropdown-divider" />
                                    <a href="/account" className="dropdown-item">Account</a>
                                    <a onClick={handleLogout} className="dropdown-item">Logout</a>
                            </div>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse" id="sidebarCollapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="/trains" className="nav-link">
                                    <LiaTrainSolid /> Trains
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/seats">
                                    <MdOutlineAirlineSeatReclineNormal /> Seats
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/stations">
                                    <MdTransferWithinAStation /> Stations
                                    {/*<span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span>*/}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/routes">
                                    <LiaRouteSolid /> Routes
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/schedules">
                                    <GrSchedules /> Schedules
                                </a>
                            </li>
                        </ul>
                        <hr className="navbar-divider my-5 opacity-20" />
                            <div className="mt-auto"></div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="/account">
                                        <RiAccountPinCircleFill /> Account
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link cursor-pointer" onClick={handleLogout}>
                                        <RiLogoutCircleRFill />Logout
                                    </a>
                                </li>
                            </ul>
                    </div>
                </div>
            </nav>
        </div>)
}

export default Sidebar
