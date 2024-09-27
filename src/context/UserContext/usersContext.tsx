import React, { createContext, useEffect, useState } from "react";

import camelcaseKeysDeep from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import Cookies from "js-cookie";

import { isEmpty } from "lodash";

import { IChildrenProps } from "../../interfaces/reactProps";
import { API } from "../../api";

import {
  ICreateUser,
  IUpdateUser,
  IUserContext,
  IUserLogin,
} from "../../interfaces/UserInterfaces";


const UserContext = createContext<IUserContext>({
  user: {},
  token: "",
  setUser: () => {},
  getUser: async () => Promise.resolve(),
  loginUser: async () => Promise.resolve(),
  getUserById: async () => Promise.resolve(),
  createUser: async () => Promise.resolve(""),
  updateUser: async () => Promise.resolve(),
  deleteUser: async () => Promise.resolve(),
  loginUserGoogle: async () => Promise.resolve(),
  setToken: () => {},
});

export const UserProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState({});
  const [isFetched, setIsFetched] = useState(false);
  const [token, setToken] = useState(Cookies.get("auth_token"));

  const getUser = async (token: string) => {
    if (!token) {
      return "token must be provided";
    }
    const res = await API.get("users/retrieve_token/", {
      headers: { Authorization: `Token ${token}` },
    })
      .then(({ data }) => camelcaseKeysDeep(data))
      .catch(() => {
        setUser({});
        Cookies.remove("auth_token");
      });
    return res;
  };

  const loginUser = async (data: IUserLogin) => {
    const res = await API.post("users/login/", data).then(({ data }) => {
      Cookies.set("auth_token", data.token, { expires: 7 });
      return data;
    });
    return res;
  };
  const loginUserGoogle = async () => {
    // const res = await signInWithPopup(auth, provider).then(({ user }) => {
    //   setUser(user);
    //   return user
    // });
    // return res
  };

  const getUserById = async (user_id: number) => {
    const res = await API.get(`/user/${user_id}/`, {
      headers: { Authorization: `Token ${token}` },
    }).then(({ data }) => camelcaseKeysDeep(data));
    return res;
  };

  const createUser = async (data: ICreateUser) => {
    data = snakecaseKeys(data as any);
    const res = await API.post(`/users/register/`, data, {
      headers: { Authorization: `Token ${token}` },
    }).then(({ data }) => camelcaseKeysDeep(data));
    return res;
  };

  const updateUser = async (user_id: number, data: IUpdateUser) => {
    data = snakecaseKeys(data as any);
    const res = await API.patch(`/user/${user_id}/`, data, {
      headers: { Authorization: `Token ${token}` },
    }).then(({ data }) => camelcaseKeysDeep(data));
    return res;
  };

  const deleteUser = async (user_id: number) => {
    const res = await API.delete(`/user/${user_id}/`, {
      headers: { Authorization: `Token ${token}` },
    }).then(({ data }) => camelcaseKeysDeep(data));
    return res;
  };

  useEffect(() => {
    if (isEmpty(user) && token && token !== undefined && isFetched === false) {
      getUser(token).then(setUser);
      setIsFetched(true);
    }
  }, [token]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        token,
        loginUser,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        setToken,
        loginUserGoogle
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
