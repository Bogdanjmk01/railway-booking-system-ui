import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import useDeleteStation from "./hooks/useDeleteStation";
import useGetAllStations from "./hooks/useGetAllStations";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import StationApi from "./api/stationApi";
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr";

const StationList = () => {
    const { exportToCsv, exportToPdf } = StationApi();
    const { stations, isLoading } = useGetAllStations();
    const { deleteStation } = useDeleteStation();
    const navigate = useNavigate();

    const columns = [
        {
            dataField: "id",
            text: "Id",
            sort: true
        },
        {
            dataField: "stationName",
            text: "Station Name",
            sort: true
        },
        {
            dataField: "location",
            text: "Location Name",
            sort: true
        },
        {
            text: "Actions",
            dataField: "actions",
            formatter: (cell, row) => (
                <div>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteStation(row.id)}
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
                <button onClick={() => navigate("/create/station")} className="btn btn-outline-success mb-4">+ Add Station</button>
                &nbsp;
                <button onClick={() => exportToCsv()} className="btn btn-outline-success mb-4"><GrDocumentCsv /></button>
                &nbsp;
                <button onClick={() => exportToPdf()} className="btn btn-danger mb-4"><GrDocumentPdf /></button>
                <BootstrapTable keyField="id" data={isLoading ? [] : stations} columns={columns} striped hover condensed pagination={paginationFactory()} filter={filterFactory()} />
            </main>
        </div>
    );
};

export default StationList;
