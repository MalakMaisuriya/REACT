import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import GInput from "./GInput";
//import { colorFor } from "../utils";
import { colorFor } from "../utils/contactUtils";





 const ContactForm = ({ contacts, setContacts, edit }) => {
      const nav = useNavigate();
      const { id } = useParams();

    
      const existing = edit ? contacts.find(c => c.id === parseInt(id)) : null;
      const [form, setForm] = useState(existing || { first:'', last:'', email:'', phone:'', company:'', label:'Mobile' });

      const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

      const save = () => {
        if (!form.first.trim()) return alert('First name is required');
        if (edit) {
          setContacts(cs => cs.map(c => c.id === parseInt(id) ? { ...form, id: parseInt(id) } : c));
          nav(`/contact/${id}`);
        } else {
          const newC = { ...form, id: Date.now() };
          setContacts(cs => [...cs, newC]);
          nav('/');
        }
      };

      return (
        <div className="form-page">
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:24}}>
            <button className="icon-btn" onClick={()=>nav(-1)}><i className="bi bi-arrow-left"></i></button>
            <h2 style={{fontFamily:"'Google Sans',sans-serif", fontSize:24, fontWeight:400, margin:0}}>{edit ? 'Edit contact' : 'Create contact'}</h2>
          </div>

          <div className="form-avatar-wrap">
            <div style={{ width:80, height:80, borderRadius:'50%', background: form.first ? colorFor(form.first) : '#9aa0a6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, color:'white', fontFamily:"'Google Sans',sans-serif" }}>
              {form.first ? (form.first[0] + (form.last[0]||'')).toUpperCase() : <i className="bi bi-person" style={{fontSize:36}}></i>}
            </div>
            <button className="btn-cancel" style={{fontSize:13}}><i className="bi bi-camera me-1"></i>Add photo</button>
          </div>

          {/* Name */}
          <div className="field-row">
            <i className="bi bi-person" style={{fontSize:20, color:'var(--on-surface-variant)', marginTop:22}}></i>
            <div className="field-group">
              <GInput label="First name" name="first" val={form.first} onChange={handle} />
              <GInput label="Last name" name="last" val={form.last} onChange={handle} />
            </div>
          </div>

          <div className="field-row">
            <i className="bi bi-briefcase" style={{fontSize:20, color:'var(--on-surface-variant)', marginTop:22}}></i>
            <div className="field-group">
              <GInput label="Company" name="company" val={form.company} onChange={handle} />
            </div>
          </div>

          <hr className="form-divider" />

          {/* Phone */}
          <div className="field-row">
            <i className="bi bi-telephone" style={{fontSize:20, color:'var(--on-surface-variant)', marginTop:22}}></i>
            <div className="field-group">
              <GInput label="Phone" name="phone" val={form.phone} onChange={handle} type="tel" />
              <div className="google-input-wrap" style={{maxWidth:130}}>
                <select className="google-input" name="label" value={form.label} onChange={handle} style={{paddingTop:20, appearance:'none'}}>
                  <option>Mobile</option><option>Home</option><option>Work</option><option>Other</option>
                </select>
                <label className="google-label" style={{top:4, fontSize:11}}>Label</label>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="field-row">
            <i className="bi bi-envelope" style={{fontSize:20, color:'var(--on-surface-variant)', marginTop:22}}></i>
            <div className="field-group">
              <GInput label="Email" name="email" val={form.email} onChange={handle} type="email" />
            </div>
          </div>

          <button className="btn-cancel" style={{fontSize:13, marginLeft:32, marginTop:4}}>
            <i className="bi bi-plus me-1"></i>Add field
          </button>

          <div className="form-actions">
            <button className="btn-cancel" onClick={()=>nav(-1)}>Cancel</button>
            <button className="btn-save" onClick={save}>Save</button>
          </div>
        </div>
      );
    };
    export default ContactForm;