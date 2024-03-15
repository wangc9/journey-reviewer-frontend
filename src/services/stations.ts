/* eslint-disable import/no-extraneous-dependencies */
import axios, { AxiosError } from 'axios';
import type { IStation } from '../features/FileUpload/stationSlice';

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

export type StationCountTuple<K, V> = [K, V];

const getById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/stations/sid/${id}`);
  const name = response.data.station.Nimi;
  const address = response.data.station.Osoite;
  const startCount = response.data.station.journeys.depart.length;
  const endCount = response.data.station.journeys.arrive.length;
  const startSum = response.data.station.journeys.depart.reduce(
    (prev: number, curr: { distance: number; id: string }) =>
      prev + curr.distance,
    0,
  );
  const endSum = response.data.station.journeys.arrive.reduce(
    (prev: number, curr: { distance: number; id: string }) =>
      prev + curr.distance,
    0,
  );
  const avgStart = startCount === 0 ? 0 : startSum / startCount;
  const avgEnd = endCount === 0 ? 0 : endSum / endCount;
  const sortedDepartList = (
    Object.entries(response.data.station.departure) as Array<
      StationCountTuple<string, number>
    >
  ).sort((a, b) => b[1] - a[1]);
  const popularDepartList = sortedDepartList.slice(0, 5);
  const popularDepart: Array<StationCountTuple<string, number>> = [];
  await Promise.all(
    await popularDepartList.map(async (tuple) => {
      const newTuple: StationCountTuple<string, number> = [
        (await axios.get(`${baseUrl}/stations/id/${tuple[0]}`)).data.name,
        tuple[1],
      ];
      popularDepart.push(newTuple);
    }),
  );
  const sortedDestList = (
    Object.entries(response.data.station.destination) as Array<
      StationCountTuple<string, number>
    >
  ).sort((a, b) => b[1] - a[1]);
  const popularDestList = sortedDestList.slice(0, 5);
  const popularDest: Array<StationCountTuple<string, number>> = [];
  await Promise.all(
    await popularDestList.map(async (tuple) => {
      const newTuple: StationCountTuple<string, number> = [
        (await axios.get(`${baseUrl}/stations/id/${tuple[0]}`)).data.name,
        tuple[1],
      ];
      popularDest.push(newTuple);
    }),
  );
  // console.log(Object.entries(response.data.station.departure));
  // console.log(popularDepart);

  return {
    name,
    address,
    startCount,
    endCount,
    avgStart,
    avgEnd,
    departList: popularDepart,
    destList: popularDest,
  };
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
 * Get 10 stations according to the page number.
 *
 * @param page - page number
 *
 * @returns An array of basic station information `Array<{name, SId, x, y}>`
 */
const getByPage = async (page: number) => {
  const response = await axios.get(`${baseUrl}/stations/page/${page}`);

  const { stations } = response.data;

  const result = stations.map((station: IStation) => ({
    name: station.Nimi,
    SId: station.SId,
    x: station.x,
    y: station.y,
  }));

  return result;
};

/**
 * Get the number of pages.
 */
const getPageCount = async () => {
  const response = await axios.get(`${baseUrl}/stations/count`);

  const { count } = response.data;

  return count;
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

export default {
  getAll,
  getByUser,
  getById,
  getByPage,
  getPageCount,
  createSingleStation,
};
