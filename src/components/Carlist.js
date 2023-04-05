import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from "./AddCar";

export default function Carlist() {
  const [cars, setCars] = React.useState([]);

  const fetchCars = () => {
    fetch("https://carrestapi.herokuapp.com/cars")
      .then((response) => response.json())
      .then((responseData) => setCars(responseData._embedded.cars))
      .catch((err) => console.error(err));
  };

  // shift + alt +f
  React.useEffect(() => {
    fetchCars();
  }, []);

  const sarakeMaareet = [
    { field: "brand", sortable: true, filter: true },
    { field: "model", sortable: true, filter: true },
    { field: "color", sortable: true, filter: true },
    { field: "fuel", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    {
      headerName: "",
      width: 100,
      cellRenderer: (params) => (
        <Button onClick={addCar} variant="outlined">
          {" "}
          EDIT
        </Button>
      ),
    },
    {},
  ];

  const addCar = (car) => {
    console.log("PAINIKETTA PAINETTU!");
    console.log(cars);
    fetch("https://carrestapi.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(car),
    }).then((response) => {
      if (response.ok) {
        fetchCars();
      }
    });
  };

  return (
    <div>
      <AddCar addCar={addCar} />
      <div className="ag-theme-material" style={{ height: 600, width: "90" }}>
        <AgGridReact
          columnDefs={sarakeMaareet}
          rowData={cars}
          // TÄHÄN VÄLIIN LISÄTÄÄN SIVUTUS
          pagination={true}
        />
      </div>
    </div>
  );
}
