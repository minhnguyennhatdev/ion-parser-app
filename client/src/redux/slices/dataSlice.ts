/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

export interface Message {
  timestamp: number;
  data: Record<string, any>;
}

export interface Topic {
  frequency: number;
  topicType: string;
  topicName: string;
  messages: Message[];
}

export interface Robot {
  metadata: Record<string, any>;
  topics: Topic[];
}

export interface IInitialState {
  robot: Nullable<Robot>;
}

export const initialState: IInitialState = {
  robot: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setRobotData(state, action) {
      state.robot = action.payload;
    },
  },
});

// const User = useSelector((state: RootState) => state.user.user)

const { actions, reducer } = dataSlice;
export const { setRobotData } = actions;
export default reducer;
