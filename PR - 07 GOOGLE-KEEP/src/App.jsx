import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import NotesPage from './pages/NotesPage'
import RemindersPage from './pages/RemindersPage'
import LabelsPage from './pages/LabelsPage'
import ArchivePage from './pages/ArchivePage'
import BinPage from './pages/BinPage'

function App() {
  return (
    <div className="keep-app">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/notes" />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/labels" element={<LabelsPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/bin" element={<BinPage />} />
        <Route path="*" element={<Navigate replace to="/notes" />} />
      </Routes>
    </div>
  )
}

export default App
