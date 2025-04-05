import { combineReducers } from '@reduxjs/toolkit';
import dataSlice from './slices/dataSlice';

export const reducer = combineReducers({
  data: dataSlice,
});
