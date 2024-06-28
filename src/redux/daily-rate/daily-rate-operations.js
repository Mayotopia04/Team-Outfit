import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetDailyRate, axiosGetDailyRateUser } from 'api/daily-rate';
import { getUser } from 'redux/auth/auth-operations';

export const dailyRateInfo = createAsyncThunk(
  'daily-rate',
  async (data, { rejectWithValue }) => {
    try {
      const result = await axiosGetDailyRate(data);
      return result;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const dailyRateUser = createAsyncThunk(
  'daily-rate/userId',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const { _id, ...data } = userData;
      const result = await axiosGetDailyRateUser(_id, data);
      await dispatch(getUser());
      return result;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
