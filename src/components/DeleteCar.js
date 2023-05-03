import React from "react";
import { Button } from "@mui/material";

export default function DeleteCar({ deleteCar, params }) {
  const handleDelete = () => {
    deleteCar(params.data._links.car.href);
  };

  return (
    <Button onClick={handleDelete} variant="outlined">
      Delete
    </Button>
  );
}
