import { instance } from './auth';

export const axiosDay = async userData => {
  try {
    const { data } = await instance.post('/day', userData);
    return data;
  } catch (error) {
    console.error('Error fetching day data:', error);
    throw error;
  }
};

export const axiosDayEatenProduct = async date => {
  try {
    const { data } = await instance.post('/day/product', { date });
    return data;
  } catch (error) {
    console.error('Error fetching eaten product data:', error);
    throw error;
  }
};

export const axiosDayInfo = async userData => {
  try {
    const { data } = await instance.post('/day/info', userData);
    return data;
  } catch (error) {
    console.error('Error fetching day info:', error);
    throw error;
  }
};

export const axiosPeriodInfo = async () => {
  try {
    const { data } = await instance.get('/day/period');
    return data;
  } catch (error) {
    console.error('Error fetching period info:', error);
    throw error;
  }
};

export const axiosDeleteDay = async userData => {
  try {
    const { data } = await instance.post('/day/delete', userData);
    return data;
  } catch (error) {
    console.error('Error deleting day:', error);
    throw error;
  }
};
