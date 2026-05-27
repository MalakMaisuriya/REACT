
    const GInput = ({ label, name, val, onChange, type='text' }) => (
      <div className="google-input-wrap">
        <input className="google-input" type={type} name={name} value={val} onChange={onChange} placeholder=" " autoComplete="off"/>
        <label className="google-label">{label}</label>
      </div>
    );

    export default GInput;