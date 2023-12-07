/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import type { IStation } from '../features/listView/stationSlice';

const baseUrl = 'http://localhost:3001/api';

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/stations`);

  return response.data;
};

const getByUser = async (user: string) => {
  const response = await axios.get(`${baseUrl}/users/${user}`);

  const { stations } = response.data;

  return stations;
};

const createSId = () => {
  const date = new Date();
  return date.getTime();
};

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
