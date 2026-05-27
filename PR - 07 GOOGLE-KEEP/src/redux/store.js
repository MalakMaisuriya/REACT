import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './notesSlice.js'
import { loadNotes, saveNotes } from './localStorage.js'

const preloadedState = {
  notes: {
    items: loadNotes(),
  },
}

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveNotes(store.getState().notes.items)
})

export default store
