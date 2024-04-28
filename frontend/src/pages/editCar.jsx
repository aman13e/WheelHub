import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../componenets/backButton";
import Spinner from "../componenets/spinner";
import axios from "axios";

function EditCar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const [manufacturingYear, setManufacturingYear] = useState("");
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/cars/${id}`)
      .then((res) => {
        setPrice(res.data.price);
        console.log(res);
        setModel(res.data.model);
        setManufacturingYear(res.data.manufacturingYear);
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar("An Error Occured!", { variant: "error" });
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  const EditCarHandler = () => {
    const data = {
      price,
      model,
      manufacturingYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5000/cars/${id}`, data, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Car Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred", {
          variant: "error",
        });
        // alert("An error occurred while saving the car");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Car</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
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
          <span className="text-xl mr-4 text-gray-500">Model</span>
          <input
            type="text"
            className="border-2 border-sky-400 rounded-xl w-full p-2"
            value={model}
            onChange={(e) => setModel(e.target.value)}
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
          onClick={EditCarHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCar;
