import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import useGetAllSeats from "./hooks/useGetAllSeats";
import useGetAllTrains from "../Train/hooks/useGetAllTrains";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import SeatApi from "./api/seatApi";
import { GrDocumentCsv, GrDocumentPdf } from "react-icons/gr";

const SeatList = () => {
    const { exportToCsv, exportToPdf } = SeatApi();
    const navigate = useNavigate();
    const { trains, isLoading } = useGetAllTrains();
    const [selectedTrain, setSelectedTrain] = useState();
    const { seats, seatsAreLoading } = useGetAllSeats(selectedTrain);

    const handleTrainSelect = (trainId) => {
        setSelectedTrain(trainId);
    };

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
            dataField: "seatNumber",
            text: "Seat Number",
            sort: true
        },
        {
            dataField: "carNumber",
            text: "Car Number",
            sort: true
        },
        {
            dataField: "className",
            text: "Class",
            sort: true
        },
        {
            text: "Actions",
            dataField: "actions",
            formatter: (cell, row) => (
                <div>
                    <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => navigate((`/update/seat/${row.id}`))}
                    >
                        Edit
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="h-screen flex-grow-1 overflow-y-lg-auto">
            <main className="py-6 bg-surface-secondary me-4">
                <button onClick={() => navigate("/create/seat")} className="btn btn-outline-success mb-4">+ Add Seat</button>
                &nbsp;
                <button onClick={() => exportToCsv()} className="btn btn-outline-success mb-4"><GrDocumentCsv /></button>
                &nbsp;
                <button onClick={() => exportToPdf()} className="btn btn-danger mb-4"><GrDocumentPdf /></button>
                {!isLoading && <select className="form-select mb-2 w-25" value={selectedTrain || ""} onClick={(e) => handleTrainSelect(e.target.value)}>
                    <option value="" disabled>Select Train</option>
                    {trains.map((train) => (
                        <option key={train.id} value={train.id}>{train.name}</option>
                    ))}
                </select>}
                {(selectedTrain !== null || seatsAreLoading) && <BootstrapTable keyField="id" data={seatsAreLoading ? [] : seats} columns={columns} striped hover condensed pagination={paginationFactory()} filter={filterFactory()} />}
            </main>
        </div>
    )
};

export default SeatList;
