import React, { useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  useEffect(() => {
    const logout = async () => {
      try {
        axiosInstance.post('users/logout/blacklist/', {
          refresh_token: localStorage.getItem('refresh_token'),
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    logout();
  }, []);

  return <div className='logout_button'>Logout</div>;
}
