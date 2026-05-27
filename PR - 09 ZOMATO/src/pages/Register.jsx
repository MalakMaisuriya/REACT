import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRestaurant, clearError } from '../redux/authSlice';
import toast from 'react-hot-toast';
import {
  Mail, Lock, Eye, EyeOff, User, Phone, MapPin,
  ChefHat, Loader2, Camera, ImagePlus, ArrowRight, BadgeCheck,
} from 'lucide-react';
import '../styles/Auth.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', address: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = form;
    if (!name || !email || !password || !phone || !address) {
      return toast.error('Please complete every required field');
    }
    if (password.length < 6) return toast.error('Password must be at least 6 characters');

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);

    const result = await dispatch(registerRestaurant(fd));
    if (registerRestaurant.fulfilled.match(result)) {
      toast.success('Restaurant account created');
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-wrapper">
      <section className="auth-left" aria-label="Zomato partner onboarding benefits">
        <div className="auth-left-content">
          <div className="brand-logo">
            <ChefHat size={38} />
            <span>Zomato Partner</span>
          </div>

          <p className="auth-kicker">Start selling online</p>
          <h1 className="auth-headline">Bring your restaurant online with a cleaner partner setup.</h1>
          <p className="auth-subline">
            Add your details, upload a restaurant photo, and start preparing your menu for live orders.
          </p>

          <ul className="auth-benefits">
            <li><BadgeCheck size={18} /> Guided restaurant onboarding</li>
            <li><BadgeCheck size={18} /> Menu and inventory controls</li>
            <li><BadgeCheck size={18} /> Real-time order management</li>
            <li><BadgeCheck size={18} /> Clear payouts and performance</li>
          </ul>
        </div>
      </section>

      <main className="auth-right">
        <div className="auth-card register-card">
          <div className="auth-card-header">
            <div className="zomato-pill"><BadgeCheck size={14} /> Partner registration</div>
            <h2>Create your account</h2>
            <p>Set up the basics for your restaurant dashboard.</p>
          </div>

          <button type="button" className="avatar-upload" onClick={() => fileRef.current.click()}>
            {preview ? (
              <img src={preview} alt="Restaurant preview" className="avatar-preview" />
            ) : (
              <span className="avatar-placeholder">
                <ImagePlus size={30} />
                <span>Upload photo</span>
              </span>
            )}
            <span className="avatar-overlay"><Camera size={20} /></span>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} hidden />
          </button>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Restaurant name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input id="name" type="text" name="name" placeholder="Spice Garden" value={form.name} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <div className="input-wrapper">
                  <Phone size={18} className="input-icon" />
                  <input id="phone" type="tel" name="phone" placeholder="9876543210" value={form.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">Email address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input id="reg-email" type="email" name="email" placeholder="restaurant@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="reg-password"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPass(!showPass)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Restaurant address</label>
              <div className="input-wrapper">
                <MapPin size={18} className="input-icon" />
                <input id="address" type="text" name="address" placeholder="12 MG Road, Surat" value={form.address} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spin" /> Creating account
                </>
              ) : (
                <>
                  Create account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
