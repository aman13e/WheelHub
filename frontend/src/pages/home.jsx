import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import CarImage1 from "../../src/assets/carsImage.jpg";
import CarImage2 from "../../src/assets/carImage2.webp";
import CarImage3 from "../../src/assets/carsImage3.jpg";
import Spinner from "../componenets/spinner";
import CarCard from "../componenets/home/carCard";
import CarTable from "../componenets/home/carTable";
import AuthContext from "../store/AuthContext";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { isAdmin, isSignedIn } = useContext(AuthContext);
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/cars")
      .then((res) => {
        setCars(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const signoutHandler = () => {
    authctx.signout();
    navigate("/");
  };
  return (
    <div className="p-4">
      {!isSignedIn && (
        <div className="bg-gray-100 min-h-screen flex flex-col">
          <div className="flex justify-end items-center gap-x-4 p-4">
            <Link to="/signin">
              <button className="bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-lg transition duration-300">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-sky-600 hover:bg-sky-800 text-white px-4 py-2 rounded-lg transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow">
            <h1 className="text-3xl font-bold mb-4">Welcome to Wheel Hub!</h1>
            <div className="flex justify-center gap-x-4 mb-8">
              <img
                src={CarImage1}
                alt="Car"
                className="w-1/3 rounded-lg shadow-lg mb-8"
              />
              <img
                src={CarImage2}
                alt="Car"
                className="w-1/3 rounded-lg shadow-lg mb-8"
              />
              <img
                src={CarImage3}
                alt="Car"
                className="w-1/3 rounded-lg shadow-lg mb-8"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Explore our collection of cars and find your dream ride.
            </h2>
            <p className="text-gray-700 mb-8 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis cum
              mollitia atque vero voluptas ipsa veritatis sit ab illo saepe
              rerum, explicabo et nobis repellendus in inventore dicta eveniet
              modi voluptate. Eligendi sed illum omnis laudantium incidunt natus
              illo ipsa cum eveniet aperiam quas, molestias ad aspernatur
              sapiente fugit. Consequuntur officia labore dolor suscipit eum
              atque, nulla in minus provident, amet itaque minima cumque eaque,
              officiis temporibus maiores doloremque ut sequi. Quaerat suscipit
              maiores, quidem cum sapiente est ut, eius velit aliquid modi
              veritatis recusandae! Iste quis laboriosam quasi nesciunt ex
              consequatur repudiandae saepe aliquam nisi unde! Aliquam, neque
              ut.flex
            </p>
            <div className=" justify-center">
              <Link to="/signup">
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  {" "}
                  View Cars
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-gray-100 h-12"></div>
        </div>
      )}

      {isSignedIn && (
        <div>
          <div className="flex justify-end items-center gap-x-4 my-0">
            <button
              onClick={signoutHandler}
              className="bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded-1g"
            >
              Signout
            </button>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <button
              className={`${
                showType === "table" ? "bg-sky-600" : "bg-sky-300"
              } hover:bg-sky-800 text-white px-4 py-1 rounded-1g`}
              onClick={() => setShowType("table")}
            >
              Table
            </button>
            <button
              className={`${
                showType === "card" ? "bg-sky-600" : "bg-sky-300"
              } hover:bg-sky-800 text-white px-4 py-1 rounded-1g`}
              onClick={() => setShowType("card")}
            >
              Cards
            </button>
          </div>

          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Cars List</h1>
            {isAdmin && (
              <Link to="/cars/create">
                <MdOutlineAddBox className="text-sky-800 text-4xl" />
                Add Car
              </Link>
            )}
          </div>

          {loading ? (
            <Spinner />
          ) : showType === "card" ? (
            <CarCard cars={cars} />
          ) : (
            <CarTable cars={cars} />
          )}
        </div>
      )}
    </div>
  );
}
