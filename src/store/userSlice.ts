import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit';

export const saveUser = createAsyncThunk(
 'user/saveUser',
 async (user: any, _thunkAPI: { dispatch: (arg0: { type: string; payload: any; }) => void; getState: () => any; }) => {
 localStorage.setItem('user', JSON.stringify(user));
 }
);

const userSlice = createSlice({
 name: 'user',
 initialState: { user: null }, // начальное состояние
 reducers: {
    setUser: (state, action: PayloadAction<any>) => {
        state.user = action.payload;
    }
 },
 extraReducers: (builder: ActionReducerMapBuilder<{ user: null; }>) => {
  builder.addCase(saveUser.fulfilled, (state, action: PayloadAction<any>) => {
    state.user = action.payload; // обновляем состояние при успешном выполнении saveUser
  });
 },
});

export default userSlice.reducer;


