import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import DeleteCar from "./DeleteCar";

export default function Carlist() {
  const [cars, setCars] = React.useState([]);

  const fetchCars = () => {
    fetch("https://carrestapi.herokuapp.com/cars")
      .then((response) => response.json())
      .then((responseData) => setCars(responseData._embedded.cars))
      .catch((err) => console.error(err));
  };

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
      cellRendererFramework: (params) => (
        <EditCar updateCar={updateCar} params={params} />
      ),
    },
    {
      headerName: "",
      cellRendererFramework: (params) => (
        <DeleteCar deleteCar={deleteCar} params={params} />
      ),
    },
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

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (response.ok) fetchCars();
        else alert("Something went wrong!");
      })
      .catch((err) => console.error(err));
  };

  const deleteCar = (link) => {
    fetch(link, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) fetchCars();
        else alert("Something went wrong!");
      })
      .catch((err) => console.error(err));
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
