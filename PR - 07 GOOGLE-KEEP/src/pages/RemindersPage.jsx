import { useSelector, useDispatch } from 'react-redux'
import KeepHeader from '../components/KeepHeader'
import NoteCreator from '../components/NoteCreator'
import NoteCard from '../components/NoteCard'
import { togglePin, deleteNote, updateNote } from '../redux/notesSlice.js'
import { MdNotificationsNone } from 'react-icons/md'

function RemindersPage() {
  const dispatch = useDispatch()
  const reminderNotes = useSelector((state) =>
    state.notes.items.filter((note) => note.reminder && !note.deleted),
  )

  return (
    <main className="page-shell">
      <KeepHeader
        title="Reminders"
        subtitle="Time-sensitive notes and follow-ups stay visible here."
        searchPlaceholder="Search reminders"
      />
      <div className="note-creator-floating">
        <NoteCreator />
      </div>

      {reminderNotes.length === 0 ? (
        <div className="empty-state">
          <MdNotificationsNone className="empty-state-icon" />
          <strong>No reminders yet</strong>
          <span>Add a reminder to a note to see it here.</span>
        </div>
      ) : (
        <section className="notes-section">
          <div className="section-header">
            <h2 className="section-title">Reminders</h2>
            <span>{reminderNotes.length}</span>
          </div>
          <div className="notes-container">
            {reminderNotes.map((note) => (
              <NoteCard
                key={note.id}
                {...note}
                onPin={() => dispatch(togglePin(note.id))}
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

export default RemindersPage
