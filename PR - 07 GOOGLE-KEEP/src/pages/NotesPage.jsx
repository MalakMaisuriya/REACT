import { useSelector, useDispatch } from 'react-redux'
import KeepHeader from '../components/KeepHeader'
import NoteCreator from '../components/NoteCreator'
import NoteCard from '../components/NoteCard'
import { togglePin, archiveNote, deleteNote, updateNote } from '../redux/notesSlice.js'
import { MdLightbulbOutline } from 'react-icons/md'

function NotesPage() {
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.notes.items)
  const visibleNotes = notes.filter((note) => !note.archived && !note.deleted)
  const pinnedNotes = visibleNotes.filter((note) => note.pinned)
  const otherNotes = visibleNotes.filter((note) => !note.pinned)

  const renderNoNotes = () => (
    <div className="empty-state">
      <MdLightbulbOutline className="empty-state-icon" />
      <strong>Notes you add appear here</strong>
      <span>Start with a thought, link, checklist, or tiny plan.</span>
    </div>
  )

  return (
    <main className="page-shell">
      <KeepHeader
        title="Notes"
        subtitle={`${visibleNotes.length} active note${visibleNotes.length === 1 ? '' : 's'} in your workspace`}
      />
      <div className="note-creator-floating">
        <NoteCreator />
      </div>

      {visibleNotes.length === 0 ? (
        renderNoNotes()
      ) : (
        <>
          {pinnedNotes.length > 0 && (
            <section className="notes-section">
              <div className="section-header">
                <h2 className="section-title">Pinned</h2>
                <span>{pinnedNotes.length}</span>
              </div>
              <div className="notes-container">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    {...note}
                    onPin={() => dispatch(togglePin(note.id))}
                    onArchive={() => dispatch(archiveNote(note.id))}
                    onDelete={() => dispatch(deleteNote(note.id))}
                    onEdit={(updated) => dispatch(updateNote(updated))}
                  />
                ))}
              </div>
            </section>
          )}

          {otherNotes.length > 0 && (
            <section className="notes-section">
              <div className="section-header">
                <h2 className="section-title">Others</h2>
                <span>{otherNotes.length}</span>
              </div>
              <div className="notes-container">
                {otherNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    {...note}
                    onPin={() => dispatch(togglePin(note.id))}
                    onArchive={() => dispatch(archiveNote(note.id))}
                    onDelete={() => dispatch(deleteNote(note.id))}
                    onEdit={(updated) => dispatch(updateNote(updated))}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default NotesPage
