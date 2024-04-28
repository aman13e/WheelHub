import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../componenets/spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
import AuthContext from "../store/AuthContext";

function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const authctx = useContext(AuthContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/users/signin", { email, password })
      .then((res) => {
        authctx.signin(res?.data?.access_token, res?.data?.user?.isAdmin);
        setLoading(false);
        enqueueSnackbar("Logged in successfully", { variant: "success" });

        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error occurred. Please try again.", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl my-4 text-center font-bold">Sign In</h1>
      {loading && <Spinner />}
      <form
        className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-4">
          <label htmlFor="email" className="text-xl text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@gmail.com"
            required
            className="border-2 border-gray-400 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="text-xl text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="border-2 border-gray-400 rounded-lg w-full p-3 focus:outline-none focus:border-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-3 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading || !email || !password}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="flex justify-center mt-4">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
