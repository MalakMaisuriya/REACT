const STORAGE_KEY = 'keep_notes'

export function loadNotes() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY)
    return serialized ? JSON.parse(serialized) : []
  } catch (error) {
    console.warn('Failed to load notes from localStorage:', error)
    return []
  }
}

export function saveNotes(notes) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.warn('Failed to save notes to localStorage:', error)
  }
}
