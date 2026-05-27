import { useSelector, useDispatch } from 'react-redux'
import KeepHeader from '../components/KeepHeader'
import NoteCard from '../components/NoteCard'
import { archiveNote, deleteNote, updateNote } from '../redux/notesSlice.js'
import { MdArchive } from 'react-icons/md'

function ArchivePage() {
  const dispatch = useDispatch()
  const archivedNotes = useSelector((state) => state.notes.items.filter((note) => note.archived && !note.deleted))

  return (
    <main className="page-shell">
      <KeepHeader
        title="Archive"
        subtitle="Keep finished notes out of the way without deleting them."
        searchPlaceholder="Search archive"
      />

      {archivedNotes.length === 0 ? (
        <div className="empty-state">
          <MdArchive className="empty-state-icon" />
          <strong>No archived notes</strong>
          <span>Archived notes will collect here.</span>
        </div>
      ) : (
        <section className="notes-section">
          <div className="section-header">
            <h2 className="section-title">Archive</h2>
            <span>{archivedNotes.length}</span>
          </div>
          <div className="notes-container">
            {archivedNotes.map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                onArchive={() => dispatch(archiveNote(note.id))}
                onDelete={() => dispatch(deleteNote(note.id))}
                onEdit={(updated) => dispatch(updateNote(updated))}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default ArchivePage
