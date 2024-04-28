import { Link } from "react-router-dom";
import { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import AuthContext from "../../store/AuthContext";

function CarTable({ cars }) {
  const authctx = useContext(AuthContext);
  return (
    <div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Model
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Manufacturing Year
            </th>
            <th className="border border-slate-600 rounded-md">Price</th>
            <th className="border border-slate-600 rounded-md ">Operations</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car, i) => (
            <tr key={car._id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {i + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {car.model}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {car.manufacturingYear}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {car.price}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <div className="group">
                    <div className=" text-white px-4 py-2 transition-all duration-300 transform group-hover:scale-105">
                      <Link to={`/cars/details/${car._id}`}>
                        <BsInfoCircle className="text-2x1 text-green-800" />
                      </Link>
                    </div>

                    <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30 ">
                      Car Details
                    </div>
                  </div>

                  <div className="group">
                    <div className=" text-white px-4 py-2 transition-all duration-300 transform group-hover:scale-105">
                      {authctx.isAdmin && (
                        <Link to={`/cars/edit/${car._id}`}>
                          <AiOutlineEdit className="text-2x1 text-yellow-600 hover:" />
                        </Link>
                      )}
                    </div>

                    <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30">
                      Edit Car
                    </div>
                  </div>

                  <div className="group">
                    <div className=" text-white px-4 py-2 transition-all duration-300 transform group-hover:scale-105">
                      {authctx.isAdmin && (
                        <Link to={`/cars/delete/${car._id}`}>
                          <MdOutlineDelete className="text-2x1 text-red-600" />
                        </Link>
                      )}
                    </div>

                    <div className="hidden group-hover:block bg-gray-800 text-white p-2 absolute top-18 left-30">
                      Delete Car
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarTable;
