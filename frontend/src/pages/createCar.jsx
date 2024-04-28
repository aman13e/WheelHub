import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../componenets/backButton";
import Spinner from "../componenets/spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
function CreateCar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const SaveCarHandler = () => {
    const data = {
      price,
      model,
      manufacturingYear,
    };
    setLoading(true);

    const token = localStorage.getItem("access_token");

    axios
      .post("http://localhost:5000/cars", data, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Car saved successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error occurred while saving the car");
        enqueueSnackbar("An error occurred while saving the car", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Car</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Model</span>
          <input
            type="text"
            className="border-2 border-sky-400 rounded-xl w-full p-2"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Price</span>
          <input
            type="text"
            className="border-2 border-sky-400 rounded-xl w-full p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Manufacturing Year</span>
          <input
            type="number"
            className="border-2 border-sky-400 rounded-xl w-full p-2"
            value={manufacturingYear}
            onChange={(e) => setManufacturingYear(e.target.value)}
          />
        </div>
        <button
          className="p-4 bg-sky-300 m-8 rounded-xl hover:bg-green-700 text-white text-2xl"
          onClick={SaveCarHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateCar;
