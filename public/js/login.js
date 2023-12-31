/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alert';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('fail', 'Incorrect password or email');
    console.log(err.response.data);
  }
};

export const loggout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: ''
    });
    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out!! Try again');
  }
};
