import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { DialogTitle } from "@mui/material";

export default function EditCar({ updateCar, params }) {
  const [open, setOpen] = React.useState(false);

  const [car, setCar] = React.useState({
    brand: "",
    model: "",
    color: "",
    fuel: "",
    price: "",
    year: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
      brand: params.data.brand,
      model: params.data.model,
      color: params.data.color,
      fuel: params.data.fuel,
      price: params.data.price,
      year: params.data.year,
    })
  };
  const handleSave = () => {
    updateCar(car, params.data._links.car.href);
  };
  const inputChanged = (event) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined">
        Edit Car
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            name="brand"
            onChange={inputChanged}
            margin="dense"
            label="Brand"
            fullWidth
            variant="standard"
            value={car.brand}
          />
          <TextField
            name="model"
            onChange={inputChanged}
            margin="dense"
            label="Model"
            fullWidth
            variant="standard"
            value={car.model}
          />
          <TextField
            name="color"
            onChange={inputChanged}
            margin="dense"
            label="Color"
            fullWidth
            variant="standard"
            value={car.color}
          />
          <TextField
            name="fuel"
            onChange={inputChanged}
            margin="dense"
            label="Fuel"
            fullWidth
            variant="standard"
            value={car.fuel}
          />
          <TextField
            name="year"
            onChange={inputChanged}
            margin="dense"
            label="Year"
            fullWidth
            variant="standard"
            value={car.year}
          />
          <TextField
            name="price"
            onChange={inputChanged}
            margin="dense"
            label="Price"
            fullWidth
            variant="standard"
            value={car.price}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
