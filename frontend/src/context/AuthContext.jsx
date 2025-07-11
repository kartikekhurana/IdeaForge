import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get("/me");
      setCurrentUser(res.data.currentUser);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setAuthLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
