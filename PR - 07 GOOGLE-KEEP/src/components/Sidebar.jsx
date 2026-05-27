import { Nav, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { MdAdd, MdArchive, MdDelete, MdEdit, MdLightbulb, MdNotes, MdNotifications } from 'react-icons/md'

function Sidebar() {
  return (
    <aside className="keep-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <MdLightbulb size={25} />
        </div>
        <div>
          <h2 className="sidebar-title">Keep</h2>
          <p className="sidebar-subtitle">Ideas, sorted</p>
        </div>
      </div>

      <Nav className="flex-column sidebar-nav">
        <Nav.Link as={NavLink} to="/notes" end className="nav-link">
          <MdNotes size={20} />
          <span>Notes</span>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/reminders" className="nav-link">
          <MdNotifications size={20} />
          <span>Reminders</span>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/labels" className="nav-link">
          <MdEdit size={20} />
          <span>Labels</span>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/archive" className="nav-link">
          <MdArchive size={20} />
          <span>Archive</span>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/bin" className="nav-link">
          <MdDelete size={20} />
          <span>Trash</span>
        </Nav.Link>
      </Nav>

      <div className="sidebar-footer">
        <Button variant="link" className="label-create-button">
          <MdAdd size={18} />
          <span>Create label</span>
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
