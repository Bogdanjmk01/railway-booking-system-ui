import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import useGetAllSchedules from "./hooks/useGetAllSchedules";
import useDeleteSchedule from "./hooks/useDeleteSchedule";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ScheduleApi from "./api/scheduleApi";
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr";

const ScheduleList = () => {
    const { exportToCsv, exportToPdf } = ScheduleApi();
    const { schedules, isLoading } = useGetAllSchedules();
    const { deleteSchedule } = useDeleteSchedule();
    const navigate = useNavigate();

    const columns = [
        {
            dataField: "id",
            text: "Id",
            sort: true
        },
        {
            dataField: "trainId",
            text: "Train Id",
            sort: true
        },
        {
            dataField: "routeId",
            text: "Route Id",
            sort: true
        },
        {
            dataField: "departureTime",
            text: "Departure Time",
            sort: true
        },
        {
            dataField: "arrivalTime",
            text: "Arrival Time",
            sort: true
        },
        {
            text: "Actions",
            dataField: "actions",
            formatter: (cell, row) => (
                <div>
                    <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => navigate((`/update/schedule/${row.id}`))}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteSchedule(row.id)}
                    >
                        Delete
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <button onClick={() => navigate("/create/schedule")} className="btn btn-outline-success mb-4">+ Add Schedule</button>
                &nbsp;
                <button onClick={() => exportToCsv()} className="btn btn-outline-success mb-4"><GrDocumentCsv /></button>
                &nbsp;
                <button onClick={() => exportToPdf()} className="btn btn-danger mb-4"><GrDocumentPdf /></button>
                <BootstrapTable keyField="id" data={isLoading ? [] : schedules} columns={columns} striped hover condensed pagination={paginationFactory()} filter={filterFactory()} />
            </main>
        </div>
    );
};

export default ScheduleList;
