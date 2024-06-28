import instance from './auth';

export const axiosProductSearch = async query => {
  try {
    const { data } = await instance.post(`/product?search=${query}`);
    return data;
  } catch (error) {
    console.error('Error searching for products:', error);
    throw error;
  }
};

export const axiosAddNewProduct = async userData => {
  try {
    const response = await instance.post('/product/add', userData);
    return response.data;
  } catch (error) {
    console.error('Error adding new product:', error);
    throw error;
  }
};
