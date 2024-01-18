import useGetAllTrains from "./hooks/useGetAllTrains";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";
import useDeleteTrain from "./hooks/useDeleteTrain";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import TrainApi from "./api/trainApi";
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr";

const TrainList = () => {
    const { exportToCsv, exportToPdf } = TrainApi();
    const { trains, isLoading } = useGetAllTrains();
    const { mutate } = useDeleteTrain();
    const navigate = useNavigate();

    const columns = [
        {
            dataField: "id",
            text: "Id",
            sort: true
        },
        {
            dataField: "name",
            text: "Train Name",
            sort: true
        },
        {
            dataField: "type",
            text: "Train Type",
            sort: true
        },
        {
            text: "Actions",
            dataField: "actions",
            formatter: (cell, row) => (
                <div>
                    <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => navigate((`/update/train/${row.id}`))}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm"
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
                <button onClick={() => navigate("/create/train")} className="btn btn-outline-success mb-4">+ Add Train</button>
                &nbsp;
                <button onClick={() => exportToCsv()} className="btn btn-outline-success mb-4"><GrDocumentCsv /></button>
                &nbsp;
                <button onClick={() => exportToPdf()} className="btn btn-danger mb-4"><GrDocumentPdf /></button>
                <BootstrapTable keyField="id" data={isLoading ? [] : trains} columns={columns} striped hover condensed pagination={paginationFactory()} filter={filterFactory()} />
            </main>
        </div>
    );
};

export default TrainList;
