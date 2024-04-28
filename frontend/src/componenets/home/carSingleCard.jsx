import { RiCarLine } from "react-icons/ri";
import { GiCarWheel } from "react-icons/gi";
import { BsInfoCircle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import CarModal from "./carModal";
import AuthContext from "../../store/AuthContext";
import { useContext } from "react";
function CarSingleCard({ car }) {
  const [showModal, setShowModal] = useState(false);
  const { isAdmin } = useContext(AuthContext);
  return (
    <div
      key={car.id}
      className="bg-sky-50 border border-gray-800 rounded-lg px-4 py-2 m-4 relative
  hover:shadow-xl "
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-1g">
        {car.manufacturingYear}
      </h2>
      <h4 className=" my-2 text-gray-400">{car._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <RiCarLine className="text-red-300 text-2xl" />
        <h2 className="my-1">{car.price}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <GiCarWheel className="text-red-300 text-2xl" />
        <h2 className="my-1">{car.model}</h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <div className="group">
          <div className=" text-white px-4 py-2 transition-all duration-300 transform group-hover:scale-105">
            <BiShow
              className="text-blue-600 text-2xl hover:text-black cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div>

          <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30 ">
            Show Abstract
          </div>
        </div>

        <div className="group">
          <div className=" text-white px-4 py-2 transition-all duration-800 transform group-hover:scale-105">
            <Link to={`/cars/details/${car._id}`}>
              <BsInfoCircle className="text-green-600 text-2xl hover:text-black" />
            </Link>
          </div>

          <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30 ">
            Car Details
          </div>
        </div>

        {isAdmin && (
          <div className="group">
            <div className=" text-white px-4 py-2 transition-all duration-3000 transform group-hover:scale-105">
              <Link to={`/cars/edit/${car._id}`}>
                <AiOutlineEdit className="text-yellow-600 text-2xl hover:text-black" />
              </Link>
            </div>

            <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30">
              Edit Car
            </div>
          </div>
        )}

        {isAdmin && (
          <div className="group">
            <div className=" text-white px-4 py-2 transition-all duration-300 transform group-hover:scale-105">
              <Link to={`/cars/delete/${car._id}`}>
                <MdOutlineDelete className="text-red-600 text-2xl hover:text-black" />
              </Link>
            </div>

            <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30">
              Delete
            </div>
          </div>
        )}
      </div>
      {showModal && <CarModal car={car} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CarSingleCard;
