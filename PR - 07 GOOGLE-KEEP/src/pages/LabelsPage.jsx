import KeepHeader from '../components/KeepHeader'
import { MdLabelOutline } from 'react-icons/md'

function LabelsPage() {
  return (
    <main className="page-shell">
      <KeepHeader
        title="Labels"
        subtitle="Create simple groups for projects, people, and priorities."
        searchPlaceholder="Search labels"
      />
      <div className="empty-state">
        <MdLabelOutline className="empty-state-icon" />
        <strong>No labels yet</strong>
        <span>Labels you create will appear here.</span>
      </div>
    </main>
  )
}

export default LabelsPage
