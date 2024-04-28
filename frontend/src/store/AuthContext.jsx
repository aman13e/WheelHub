import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  access_token: null,
  isSignedIn: false,
  isAdmin: false,
  signin: (access_token, isAdmin) => {},
  signout: () => {},
});

export const AuthContextProvider = (props) => {
  const [access_token, setAccess_token] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check localStorage for an existing authenticated user
    const storedToken = localStorage.getItem("access_token");
    const storedIsAdmin = localStorage.getItem("isAdmin");

    if (storedToken && storedIsAdmin) {
      setAccess_token(storedToken);
      setIsAdmin(storedIsAdmin === "true");
    }
  }, []);

  const userIsSignedIn = !!access_token;

  const signHandler = (access_token, isAdmin) => {
    setAccess_token(access_token);
    setIsAdmin(isAdmin);

    // Store the access_token and isAdmin in localStorage
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("isAdmin", isAdmin.toString());
  };

  const signoutHandler = () => {
    setAccess_token(null);
    setIsAdmin(false);

    // Remove access_token and isAdmin from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("isAdmin");
  };

  const contextValue = {
    access_token: access_token,
    isSignedIn: userIsSignedIn,
    isAdmin: isAdmin,
    signin: signHandler,
    signout: signoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
