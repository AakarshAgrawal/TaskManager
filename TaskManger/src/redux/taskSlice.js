import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    nextId: 1,
  },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.list.push({
          id: state.nextId,
          ...action.payload,
        });
        state.nextId++;
      },
      prepare(text) {
        return {
          payload: {
            text,
            completed: false,
          },
        };
      },
    },

    deleteTask: (state, action) => {
      state.list = state.list.filter((task) => task.id !== action.payload);
    },

    toggleDone: (state, action) => {
      const task = state.list.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    editTask: (state, action) => {
      const { id, newTask } = action.payload;
      const task = state.list.find((task) => task.id === id);
      if (task) task.text = newTask;
    },
  },
});

export const { addTask, deleteTask, toggleDone, editTask } = taskSlice.actions;
export default taskSlice.reducer;
