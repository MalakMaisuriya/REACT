import { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import {
  BsArchive,
  BsCalendarEvent,
  BsFillTrashFill,
  BsPalette,
  BsPencilFill,
  BsPinFill,
} from 'react-icons/bs'

const COLORS = [
  { name: 'Default', hex: '#ffffff' },
  { name: 'Coral', hex: '#ffd6d1' },
  { name: 'Amber', hex: '#ffe8a3' },
  { name: 'Lemon', hex: '#fff7bf' },
  { name: 'Mint', hex: '#dff5e1' },
  { name: 'Sage', hex: '#d8ece4' },
  { name: 'Sky', hex: '#dceeff' },
  { name: 'Cyan', hex: '#d7f3f8' },
  { name: 'Lilac', hex: '#eadffd' },
  { name: 'Rose', hex: '#f9dce8' },
  { name: 'Clay', hex: '#eadccf' },
  { name: 'Gray', hex: '#eef0f3' },
]

function NoteCard({
  id,
  title,
  description,
  color = '#ffffff',
  pinned = false,
  reminder,
  tags = [],
  onPin,
  onArchive,
  onDelete,
  onEdit,
}) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [editColor, setEditColor] = useState(color)

  const saveNote = (overrides = {}) => {
    if (onEdit) {
      onEdit({
        id,
        title: editTitle.trim() || 'Untitled',
        description: editDescription.trim(),
        color: editColor,
        ...overrides,
      })
    }
  }

  const startEditing = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditColor(color)
    setEditing(true)
  }

  const handleSave = () => {
    saveNote()
    setEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(title)
    setEditDescription(description)
    setEditColor(color)
    setEditing(false)
  }

  const handleColorChange = (nextColor) => {
    setEditColor(nextColor)
    if (onEdit) {
      onEdit({
        id,
        title: title || 'Untitled',
        description,
        color: nextColor,
      })
    }
    setShowColorPicker(false)
  }

  return (
    <Card className="note-card" style={{ backgroundColor: editing ? editColor : color }}>
      <Card.Body>
        {editing ? (
          <div className="note-edit-form">
            <Form.Control
              type="text"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              className="note-edit-title"
              aria-label="Edit note title"
              autoFocus
            />
            <Form.Control
              as="textarea"
              rows={5}
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
              className="note-edit-text"
              aria-label="Edit note text"
            />
            <div className="note-edit-actions">
              <Button variant="link" className="close-button" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="note-card-main">
              <div>
                <div className="note-card-title">{title}</div>
                {description && <div className="note-card-text">{description}</div>}
              </div>
              {pinned && <BsPinFill className="pin-indicator" size={17} />}
            </div>

            {tags.length > 0 && (
              <div className="note-tags-row">
                {tags.map((tag) => (
                  <span key={tag} className="note-chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {reminder && (
              <div className="note-reminder">
                <BsCalendarEvent size={14} />
                Reminder: {reminder}
              </div>
            )}

            <div className="note-card-toolbar">
              <div className="note-toolbar-left" aria-label="Note actions">
                {onPin && (
                  <Button
                    variant="link"
                    className="note-toolbar-btn"
                    onClick={onPin}
                    title={pinned ? 'Unpin' : 'Pin'}
                  >
                    <BsPinFill style={{ opacity: pinned ? 1 : 0.72 }} />
                  </Button>
                )}
                <Button
                  variant="link"
                  className="note-toolbar-btn"
                  title="Edit note"
                  onClick={startEditing}
                >
                  <BsPencilFill />
                </Button>
                <Button variant="link" className="note-toolbar-btn" title="Set reminder">
                  <BsCalendarEvent />
                </Button>
                <div className="color-picker-inline">
                  <Button
                    variant="link"
                    className="note-toolbar-btn"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    title="Change color"
                  >
                    <BsPalette />
                  </Button>
                  {showColorPicker && (
                    <div className="color-palette-inline">
                      {COLORS.map((colorOption) => (
                        <button
                          key={colorOption.name}
                          className="color-option-inline"
                          style={{ backgroundColor: colorOption.hex }}
                          onClick={() => handleColorChange(colorOption.hex)}
                          title={colorOption.name}
                          type="button"
                        />
                      ))}
                    </div>
                  )}
                </div>
                {onArchive && (
                  <Button
                    variant="link"
                    className="note-toolbar-btn"
                    title="Archive"
                    onClick={onArchive}
                  >
                    <BsArchive />
                  </Button>
                )}
              </div>
              {onDelete && (
                <Button
                  variant="link"
                  className="note-toolbar-btn danger"
                  onClick={onDelete}
                  title="Delete"
                >
                  <BsFillTrashFill />
                </Button>
              )}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  )
}

export default NoteCard
