import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${backendUrl}/api/v1/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
