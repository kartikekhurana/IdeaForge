import { Logs } from "../models/logs.model.js";

export const createLogs = async (userId, message) => {
  try {
    await Logs.create({ user: userId, message });
  } catch (error) {
    console.error("error while creating the log : ", error);
  }
};
