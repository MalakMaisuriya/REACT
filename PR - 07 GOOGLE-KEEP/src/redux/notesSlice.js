import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action) {
      state.items.unshift(action.payload)
    },
    updateNote(state, action) {
      const note = state.items.find((item) => item.id === action.payload.id)
      if (note) {
        note.title = action.payload.title
        note.description = action.payload.description
        if (action.payload.color) note.color = action.payload.color
        if (action.payload.tags) note.tags = action.payload.tags
        if (action.payload.reminder !== undefined) note.reminder = action.payload.reminder
      }
    },
    togglePin(state, action) {
      const note = state.items.find((item) => item.id === action.payload)
      if (note) {
        note.pinned = !note.pinned
      }
    },
    archiveNote(state, action) {
      const note = state.items.find((item) => item.id === action.payload)
      if (note) {
        note.archived = !note.archived
        if (note.archived) {
          note.pinned = false
        }
      }
    },
    deleteNote(state, action) {
      const note = state.items.find((item) => item.id === action.payload)
      if (note) {
        note.deleted = true
        note.archived = false
        note.pinned = false
      }
    },
    restoreNote(state, action) {
      const note = state.items.find((item) => item.id === action.payload)
      if (note) {
        note.deleted = false
        note.archived = false
      }
    },
    deleteForever(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addNote, updateNote, togglePin, archiveNote, deleteNote, restoreNote, deleteForever } = notesSlice.actions
export default notesSlice.reducer
