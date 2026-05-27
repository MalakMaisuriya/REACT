import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import KeepHeader from '../components/KeepHeader'
import { restoreNote, deleteForever } from '../redux/notesSlice.js'
import { MdDeleteForever, MdDeleteOutline, MdRestoreFromTrash } from 'react-icons/md'

function BinPage() {
  const dispatch = useDispatch()
  const deletedNotes = useSelector((state) => state.notes.items.filter((note) => note.deleted))

  const BinNoteCard = ({ note }) => (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      <div className="card-body">
        <div className="note-card-main">
          <div>
            <div className="note-card-title">{note.title}</div>
            {note.description && <div className="note-card-text">{note.description}</div>}
          </div>
        </div>

        <div className="note-card-toolbar">
          <Button
            variant="link"
            className="note-toolbar-btn"
            onClick={() => dispatch(restoreNote(note.id))}
            title="Restore"
          >
            <MdRestoreFromTrash size={20} />
          </Button>
          <Button
            variant="link"
            className="note-toolbar-btn danger"
            onClick={() => dispatch(deleteForever(note.id))}
            title="Delete forever"
          >
            <MdDeleteForever size={20} />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <main className="page-shell">
      <KeepHeader
        title="Trash"
        subtitle="Deleted notes stay here until you restore or remove them forever."
        searchPlaceholder="Search trash"
      />

      {deletedNotes.length === 0 ? (
        <div className="empty-state">
          <MdDeleteOutline className="empty-state-icon" />
          <strong>No deleted notes</strong>
          <span>Deleted notes will show up here.</span>
        </div>
      ) : (
        <section className="notes-section">
          <div className="section-header">
            <h2 className="section-title">Trash</h2>
            <span>{deletedNotes.length}</span>
          </div>
          <div className="notes-container">
            {deletedNotes.map((note) => (
              <BinNoteCard key={note.id} note={note} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default BinPage
