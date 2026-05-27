import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/students';

export const fetchStudents = createAsyncThunk('students/fetch', async () => {
  const response = await axios.get(API);
  return response.data;
});

export const addStudent = createAsyncThunk('students/add', async (student) => {
  const response = await axios.post(API, student);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/update', async ({ id, ...data }) => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => { 
        state.list.push(action.payload); 
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;