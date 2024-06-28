import { createSlice } from '@reduxjs/toolkit';

import { getProductOperations, addNewProduct } from './search-operations';

const initialState = {
  items: [],
  loading: false,
  error: '',
  message: '',
};

const getProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct: () => ({ ...initialState }),
  },
  extraReducers: {
    [getProductOperations.pending]: (store, payload) => {
      store.loading = true;
      store.error = null;
    },
    [getProductOperations.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.items = payload;
    },
    [getProductOperations.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    [addNewProduct.pending]: (store, payload) => {
      store.loading = true;
      store.error = null;
      store.error = null;
    },
    [addNewProduct.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [addNewProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default getProductSlice.reducer;

export const { clearProduct } = getProductSlice.actions;
