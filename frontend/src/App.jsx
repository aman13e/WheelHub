import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import ShowCar from "./pages/showCar";
import Home from "./pages/home";
import EditCar from "./pages/editCar";
import CreateCar from "./pages/createCar";
import DeleteCar from "./pages/deleteCar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthContext from "./store/AuthContext";
const App = () => {
  const { isSignedIn } = useContext(AuthContext);
  const { isAdmin } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {isAdmin && <Route path="/cars/create" element={<CreateCar />} />}
      <Route path="/cars/details/:id" element={<ShowCar />} />
      {isAdmin && <Route path="/cars/edit/:id" element={<EditCar />} />}
      {isAdmin && <Route path="/cars/delete/:id" element={<DeleteCar />} />}
      {!isSignedIn && <Route path="/signup" element={<SignUp />} />}
      {!isSignedIn && <Route path="/signin" element={<SignIn />} />}
      <Route
        path="*"
        element={
          <h1 className="text-5xl text-red-400 text-center">
            Page Not Found
            <a href="/">
              <p className="text-2xl text-gray-400 hover:text-black">
                Back to Home &rarr;
              </p>
            </a>
          </h1>
        }
      />
    </Routes>
  );
};
export default App;
