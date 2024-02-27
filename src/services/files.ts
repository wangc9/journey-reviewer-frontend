import axios, { AxiosError, AxiosResponse } from 'axios';
import { FilePondFile } from 'filepond';
import { UserCredential } from 'firebase/auth';

const baseUrl = 'http://localhost:3001/api';

/**
 * Upload a single file to the given url.
 *
 * @param file - File to be uploaded.
 * @param url - Destination url.
 *
 * @returns `{status: HTML status, data: {added: [SId], disregarded: [SId]} if successful or error message if failed}`
 */
const fileUpload = async (
  file: FilePondFile,
  url: string,
  token: UserCredential | undefined,
): Promise<
  | AxiosResponse<any, any>
  | {
      status: string | undefined;
      data: any;
    }
  | {
      status: number;
      data: string;
    }
> => {
  if (token) {
    const userId = await token.user.getIdToken();
    const formData = new FormData();
    formData.append('file', file.file);
    formData.append('token', userId);

    try {
      const response = await axios.post(`${baseUrl}/${url}`, formData);

      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return { status: error.code, data: error.response?.data.error };
      }
      return { status: 500, data: 'Incorrect service logic' };
    }
  } else {
    return {
      status: 400,
      data: "It seems that you haven't signed in yet. Sign in or sign up to add your own stations.",
    };
  }
};

export default { fileUpload };
