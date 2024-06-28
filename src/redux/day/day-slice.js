import { createSlice } from '@reduxjs/toolkit';
import {
  postEatenProduct,
  deleteEatenProduct,
  getInfoByDay,
  getInfoByPeriod,
  getEatenProduct,
} from './day-operations';

const initialState = {
  day: {},
  daySummary: {},
  periodSummary: {},
  eatenProduct: {},
  eatenProducts: [],
  loading: false,
  error: null,
};

const daySlice = createSlice({
  name: 'day',
  initialState,
  reducers: {
    clearDay: () => ({ ...initialState }),
  },
  extraReducers: {
    //* getDay
    [postEatenProduct.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [postEatenProduct.fulfilled]: (store, { payload }) => {
      store.day = payload.day;
      store.daySummary = payload.daySummary;
      store.eatenProduct = payload.eatenProduct;
      store.loading = false;
      store.summary = payload;
    },
    [postEatenProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* getEatenProduct
    [getEatenProduct.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getEatenProduct.fulfilled]: (store, { payload }) => {
      store.day = payload.day;
      store.daySummary = payload.daySummary;
      store.eatenProduct = payload.eatenProduct;
      store.loading = false;
      store.summary = payload;
    },
    [getEatenProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* deleteDay
    [deleteEatenProduct.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [deleteEatenProduct.fulfilled]: (store, { payload }) => {
      store.daySummary = payload.newDaySummary;
      store.loading = false;
    },
    [deleteEatenProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* getInfoAboutDay
    [getInfoByDay.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getInfoByDay.fulfilled]: (store, { payload }) => {
      store.eatenProducts = payload.eatenProducts;
      store.loading = false;
      store.aboutDay = payload;
    },
    [getInfoByDay.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* getInfoAboutPeriod
    [getInfoByPeriod.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getInfoByPeriod.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.periodSummary = payload;
    },
    [getInfoByPeriod.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default daySlice.reducer;

export const { clearDay } = daySlice.actions;
