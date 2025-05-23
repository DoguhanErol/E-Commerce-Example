// src/services/userService.ts

import axios from "axios";
import {  API_URL_USER } from "../config/authConfig"; // Adjust the import based on your config file
import { UserInfo } from "../models/User"; // Adjust the path as necessary
import AuthHeader from "./AuthHeader";

export const getUserProfileInfo = async (): Promise<UserInfo> => {
  try {
    const response = await axios.get<UserInfo>(API_URL_USER,{ headers: AuthHeader() });
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling function
  }
};
