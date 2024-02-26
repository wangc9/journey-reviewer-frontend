import axios, { AxiosError } from 'axios';

const baseURL = 'http://localhost:3001/api';

export interface CreateUserProps {
  username: string;
  token: string;
}

const createUser = async (props: CreateUserProps) => {
  const { username, token } = props;
  try {
    const newUser = await axios.post(`${baseURL}/users`, {
      username,
      token,
    });

    return newUser;
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.code, data: error.response?.data.error };
    }
    return {
      status: 500,
      data: 'Incorrect service logic when creating new user.',
    };
  }
};

export default { createUser };
