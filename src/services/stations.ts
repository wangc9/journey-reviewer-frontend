/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import type { IStation } from '../features/listView/stationSlice';

const baseUrl = 'http://localhost:3001/api';

/**
 * Get all stations.
 *
 * @returns All data as JSON.
 */
const getAll = async () => {
  const response = await axios.get(`${baseUrl}/stations`);

  return response.data;
};

/**
 * Get all stations added by a user.
 *
 * @param user - uid of the user.
 *
 * @returns All data as JSON.
 */
const getByUser = async (user: string) => {
  const response = await axios.get(`${baseUrl}/users/${user}`);

  const { stations } = response.data;

  return stations;
};

/**
 * Create a number according to the current time.
 *
 * @returns The time when called as number.
 */
const createSId = (): number => {
  const date = new Date();
  return date.getTime();
};

/**
 * Create a new station in the backend.
 *
 * @param station - Details of the new station
 * @param token - Token string from Firebase.
 *
 * @returns `{status: HTML status, data: the new station in JSON if successful or error message if failed}`
 */
const createSingleStation = async (
  station: Omit<IStation, 'SId'>,
  token: string,
) => {
  const SId = createSId();
  const fullStation: IStation = { ...station, SId };
  try {
    const response = await axios.post(`${baseUrl}/stations`, {
      ...fullStation,
      token,
    });

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.code, data: error.response?.data.error };
    }
    return { status: 500, data: 'Incorrect service logic' };
  }
};

export default { getAll, getByUser, createSingleStation };
