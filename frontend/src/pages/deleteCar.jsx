import axios from "axios";
import Spinner from "../componenets/spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import BackButton from "../componenets/backButton";
import { useSnackbar } from "notistack";
function DeleteCar() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  function DeleteCarHandler() {
    const token = localStorage.getItem("access_token");
    const isAdmin = localStorage.getItem("isAdmin");
    if (!token || !isAdmin) {
      enqueueSnackbar("Unauthorized", { variant: "error" });
      return;
    }
    setLoading(true);
    axios
      .delete(`http://localhost:5000/cars/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Car deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred while deleting the car", {
          variant: "error",
        });
        console.log(error);
      });
  }
  function NoDeletionHandler() {
    navigate("/");
  }
  return (
    <div className="p-4">
      {loading ? <Spinner /> : null}
      <h1 className="text-3xl p-4">Delete Car</h1>
      <BackButton />
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[700px] p-9 mx-auto">
        <h3 className="text-3xl ">Are you sure you want to delete this car?</h3>
        <div className="flex justify-between items-center">
          <button
            className="my-0 p-8 bg-sky-500 text-white px-4 py-3 rounded-1g w-[100px]"
            onClick={NoDeletionHandler}
          >
            No
          </button>
          <button
            className="my-4 ml-4 p-8 bg-red-500 text-white px-4 py-3 rounded-1g w-[100px]"
            onClick={DeleteCarHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCar;
