import { createSlice } from '@reduxjs/toolkit';
import { userApiSlice } from './userApiSlice';

const initialState = {
  accessToken: null,
  user: null,
  refreshPending: true,
  mode: 'light',
  wallet: {
    balance: 0,
    address: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload?.accessToken;
      state.user = action.payload?.UserInfo;
      state.refreshPending = false;
      localStorage.setItem('hasRefresh', 'true');
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('hasRefresh');
    },

    setRefreshPending: (state, action) => {
      state.refreshPending = action.payload;
    },

    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
      } else {
        state.mode = 'light';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApiSlice.endpoints.refresh.matchFulfilled, (state, { payload }) => {
      state.accessToken = payload?.accessToken;
      state.user = payload?.UserInfo;
      state.refreshPending = false;
    });
    builder.addMatcher(userApiSlice.endpoints.refresh.matchRejected, (state) => {
      localStorage.removeItem('hasRefresh');
      state.refreshPending = false;
    });
  },
});

export const { setCredentials, logout, setRefreshPending, changeMode, setWallet } = userSlice.actions;

export default userSlice.reducer;
