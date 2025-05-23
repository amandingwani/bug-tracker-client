import { AlertColor } from '@mui/material/Alert';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';

export interface NotificationState {
  open: boolean;
  severity?: AlertColor;
  message?: string;
  durationMS: number | null;
}

const initialState: NotificationState = {
  open: false,
  durationMS: 6000,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    hideNotification: () => initialState,
    showNotification: (state) => {
      state.open = true;
    },
    updateNotification: (
      state,
      action: PayloadAction<{ severity: AlertColor; message: string }>
    ) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    updateAndShowNotification: (
      state,
      action: PayloadAction<{ severity: AlertColor; message: string; noClose?: boolean }>
    ) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      if (action.payload.noClose) state.durationMS = null;
    },
  },
});

export const { hideNotification, showNotification, updateNotification, updateAndShowNotification } =
  notificationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
