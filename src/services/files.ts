import axios, { AxiosError } from 'axios';
import { FilePondFile } from 'filepond';

const baseUrl = 'http://localhost:3001/api';

/**
 * Upload a single file to the given url.
 *
 * @param file - File to be uploaded.
 * @param url - Destination url.
 *
 * @returns `{status: HTML status, data: {added: [SId], disregarded: [SId]} if successful or error message if failed}`
 */
const fileUpload = async (file: FilePondFile, url: string) => {
  const formData = new FormData();
  formData.append('file', file.file);

  try {
    const response = await axios.post(`${baseUrl}/${url}`, formData);

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.code, data: error.response?.data.error };
    }
    return { status: 500, data: 'Incorrect service logic' };
  }
};

export default { fileUpload };
