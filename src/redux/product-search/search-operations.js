import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  axiosProductSearch,
  axiosAddNewProduct,
} from '../../api/product-search';

export const getProductOperations = createAsyncThunk(
  '/products/fetchProducts',
  async (query, { rejectWithValue, dispatch, getState }) => {
    try {
      const data = await axiosProductSearch(query);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const addNewProduct = createAsyncThunk(
  '/product/add',
  async (userData, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axiosAddNewProduct(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
