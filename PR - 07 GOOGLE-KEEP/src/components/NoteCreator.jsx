import { useState } from 'react'
import { Form, Button, Collapse, Badge } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addNote } from '../redux/notesSlice.js'
import { BsAlarm, BsArchive, BsCheckCircle, BsImage, BsPalette, BsPersonPlus, BsPlusLg, BsXLg } from 'react-icons/bs'

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

function NoteCreator() {
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [labelInput, setLabelInput] = useState('')
  const [tags, setTags] = useState([])
  const dispatch = useDispatch()

  const addTag = (value) => {
    const tag = value.trim()
    if (!tag || tags.includes(tag)) return
    setTags((current) => [...current, tag])
  }

  const handleTagKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      addTag(labelInput)
      setLabelInput('')
    }
  }

  const handleTagRemove = (tagToRemove) => {
    setTags((current) => current.filter((tag) => tag !== tagToRemove))
  }

  const resetForm = () => {
    setTitle('')
    setText('')
    setSelectedColor('#ffffff')
    setLabelInput('')
    setTags([])
    setExpanded(false)
    setShowColorPicker(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim() && !text.trim()) return

    dispatch(
      addNote({
        id: Date.now(),
        title: title.trim() || 'Untitled',
        description: text.trim(),
        color: selectedColor,
        tags,
        pinned: false,
        archived: false,
        deleted: false,
        reminder: null,
        createdAt: new Date().toISOString(),
      }),
    )

    resetForm()
  }

  const handleClose = () => {
    if (title.trim() || text.trim()) {
      handleSubmit({ preventDefault: () => {} })
      return
    }

    resetForm()
  }

  return (
    <div className="note-creator">
      <div
        className="note-creator-box"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setExpanded(true)}
      >
        {!expanded ? (
          <div className="note-creator-collapsed">
            <Form.Control
              placeholder="New note..."
              className="note-creator-input"
              readOnly
            />
            <div className="note-creator-icons">
              <BsImage size={20} />
              <BsCheckCircle size={20} />
            </div>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <div className="note-creator-header">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="note-creator-title"
                autoFocus
              />
              <Button
                variant="link"
                className="icon-button"
                type="button"
                title="Set reminder"
              >
                <BsAlarm size={19} />
              </Button>
            </div>

            <Form.Control
              as="textarea"
              placeholder="Write your note..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="note-creator-textarea"
              rows={5}
            />

            <Collapse in={expanded}>
              <div className="note-creator-labels">
                <div className="note-tags-row">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      bg="secondary"
                      className="note-tag-chip"
                      onClick={() => handleTagRemove(tag)}
                      title="Remove label"
                    >
                      {tag}
                      <BsXLg size={10} />
                    </Badge>
                  ))}
                </div>
                <Form.Control
                  type="text"
                  placeholder="Label, then Enter"
                  className="note-creator-label-input"
                  value={labelInput}
                  onChange={(event) => setLabelInput(event.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
            </Collapse>

            <div className="note-creator-toolbar">
              <div className="note-toolbar-actions">
                <Button variant="link" className="icon-button" title="Add image" type="button">
                  <BsImage size={19} />
                </Button>
                <Button variant="link" className="icon-button" title="Collaborator" type="button">
                  <BsPersonPlus size={19} />
                </Button>
                <div className="color-picker-wrapper">
                  <Button
                    variant="link"
                    className="icon-button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    title="Change color"
                    type="button"
                  >
                    <BsPalette size={19} />
                  </Button>
                  {showColorPicker && (
                    <div className="color-palette">
                      {COLORS.map((color) => (
                        <button
                          key={color.name}
                          className="color-option"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => {
                            setSelectedColor(color.hex)
                            setShowColorPicker(false)
                          }}
                          title={color.name}
                          type="button"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="link" className="icon-button" title="Archive" type="button">
                  <BsArchive size={19} />
                </Button>
              </div>
              <div className="creator-actions">
                <Button type="submit" variant="primary" size="sm">
                  <BsPlusLg size={14} />
                  Add note
                </Button>
                <Button type="button" variant="link" onClick={handleClose} className="close-button">
                  Close
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  )
}

export default NoteCreator
