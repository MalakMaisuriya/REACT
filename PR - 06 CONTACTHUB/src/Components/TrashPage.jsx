import { fullName } from "../utils/contactUtils";
import Avatar from "./Avatar";
import Swal from "sweetalert2";


export default function TrashPage({ trash, setTrash, setContacts }) {
  const restoreContact = async (contact) => {
    const result = await Swal.fire({
      title: "Restore contact?",
      text: `${fullName(contact)} will return to your contacts.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Restore",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setContacts((prev) => [...prev, contact]);
      setTrash((prev) => prev.filter((c) => c.id !== contact.id));
      Swal.fire("Restored!", "Contact has been returned from Trash.", "success");
    }
  };

  const deleteForever = async (contact) => {
    const result = await Swal.fire({
      title: "Delete forever?",
      text: `This will permanently delete ${fullName(contact)}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete forever",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      setTrash((prev) => prev.filter((c) => c.id !== contact.id));
      Swal.fire("Deleted!", "Contact was removed forever.", "success");
    }
  };

  if (!trash.length) {
    return (
      <div className="empty-state">
        <i className="bi bi-trash"></i>
        <h3>Trash is empty</h3>
      </div>
    );
  }

  return (
    <div className="page-contacts">
      
      <div className="contacts-toolbar">
        <h1>Trash</h1>
        <span>{trash.length} contacts</span>
      </div>

     
      {trash.map(c => (
        <div key={c.id} className="contact-row">
          <Avatar contact={c} />

          <div className="info">
            <div className="name">{fullName(c)}</div>
            <div className="sub">{c.email}</div>
          </div>

          <div className="row-actions">
            <button className="icon-btn" title="Restore" onClick={() => restoreContact(c)}>
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <button className="icon-btn" title="Delete forever" onClick={() => deleteForever(c)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}