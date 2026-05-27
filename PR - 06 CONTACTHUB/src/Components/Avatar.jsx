import { colorFor, initials } from "../utils/contactUtils";

 const Avatar = ({ contact, size = 40 }) => (
      <div className="avatar" style={{ width: size, height: size, background: colorFor(contact.first), borderRadius: '50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Google Sans',sans-serif", fontWeight:500, color:'white', fontSize: size * .4, flexShrink:0 }}>
        {initials(contact)}
      </div>
    );
    export default Avatar;