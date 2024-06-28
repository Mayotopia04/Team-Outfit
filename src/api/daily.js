import { instance } from './auth';

export const axiosGetDailyRate = async userData => {
  try {
    const { data } = await instance.post('/daily-rate', userData);
    return data;
  } catch (error) {
    // Tratează eroarea aici
    console.error('Error fetching daily rate:', error);
    throw error; // Aruncă eroarea pentru a fi gestionată de codul de apelare
  }
};
