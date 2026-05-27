import { Form, Button } from 'react-bootstrap'
import { MdRefresh, MdSearch, MdSettings, MdViewAgenda } from 'react-icons/md'

function KeepHeader({
  title = 'Notes',
  subtitle = 'Capture thoughts, tasks, and reminders in one calm workspace.',
  searchPlaceholder = 'Search notes',
}) {
  return (
    <header className="keep-header">
      <div className="header-copy">
        <span className="header-kicker">Workspace</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-tools">
        <div className="keep-search">
          <MdSearch className="search-icon" size={20} />
          <Form.Control
            placeholder={searchPlaceholder}
            className="keep-search-input"
          />
        </div>
        <div className="header-actions">
          <Button variant="link" className="icon-button" title="Refresh">
            <MdRefresh size={20} />
          </Button>
          <Button variant="link" className="icon-button" title="List view">
            <MdViewAgenda size={20} />
          </Button>
          <Button variant="link" className="icon-button" title="Settings">
            <MdSettings size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default KeepHeader
