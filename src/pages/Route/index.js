import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import useGetAllRoutes from "./hooks/useGetAllRoutes";
import useDeleteRoute from "./hooks/useDeleteRoute";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import RouteApi from "./api/routeApi";
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr";

const RouteList = () => {
    const { exportToCsv, exportToPdf } = RouteApi();
    const navigate = useNavigate();
    const { routes, isLoading } = useGetAllRoutes();
    const { mutate } = useDeleteRoute();

    const columns = [
        {
            dataField: "id",
            text: "Id",
            sort: true
        },
        {
            dataField: "departureStationId",
            text: "Departure Station Id",
            sort: true
        },
        {
            dataField: "arrivalStationId",
            text: "Arrival Station Id",
            sort: true
        },
        {
            dataField: "distance",
            text: "Distance",
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
                        onClick={() => navigate((`/update/route/${row.id}`))}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm me-2"
                        onClick={() => mutate(row.id)}
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
                <button onClick={() => navigate("/create/route")} className="btn btn-outline-success mb-4">+ Add Route</button>
                &nbsp;
                <button onClick={() => exportToCsv()} className="btn btn-outline-success mb-4"><GrDocumentCsv /></button>
                &nbsp;
                <button onClick={() => exportToPdf()} className="btn btn-danger mb-4"><GrDocumentPdf /></button>
                <BootstrapTable keyField="id" data={isLoading ? [] : routes} columns={columns} striped hover condensed pagination={paginationFactory()} filter={filterFactory()} />
            </main>
        </div>
    );
};

export default RouteList;
