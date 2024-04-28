import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../componenets/spinner";
import BackButton from "../componenets/backButton";

export default function ShowCar() {
  const [car, setCar] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Access the route parameter "id"

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/cars/${id}`)
      .then((res) => {
        setCar(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]); // Add "id" as a dependency to re-fetch data when the "id" changes

  return (
    <div className="p-8">
      <BackButton />
      <h1 className="text-3xl p-4">Show Car</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Price</span>
            <span>{car.price}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Model</span>
            <span>{car.model}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Create time</span>
            <span>{new Date(car.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>{new Date(car.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
