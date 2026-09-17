import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/authService";

import {
  getToken,
  saveToken,
  removeToken,
} from "../utils/storage";

export const AuthContext =
  createContext();

export function AuthProvider({ children }) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser(token);

        setUser(currentUser);
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (
    email,
    password
  ) => {
    const data = await loginUser(
      email,
      password
    );

    saveToken(data.token);

    setUser(data.user);

    return data;
  };

  const register = async (
    name,
    email,
    password
  ) => {
    const data =
      await registerUser(
        name,
        email,
        password
      );

    saveToken(data.token);

    setUser(data.user);

    return data;
  };

  const logout = () => {
    removeToken();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}